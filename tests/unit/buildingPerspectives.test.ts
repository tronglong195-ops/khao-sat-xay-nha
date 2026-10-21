import { describe, expect, it } from 'vitest';
import { BUILDING_PERSPECTIVES, getPerspectivesForType } from '../../src/domain/buildingPerspectives';
import { OPTS } from '../../src/domain/options';

describe('Building Perspectives Domain', () => {
  it('cung cấp đầy đủ phối cảnh cho tất cả các kiểu công trình trong OPTS.type', () => {
    OPTS.type.forEach((t) => {
      const data = BUILDING_PERSPECTIVES[t];
      expect(data).toBeDefined();
      expect(data.typeName).toBe(t);
      expect(data.summary.length).toBeGreaterThan(10);
      expect(data.pinterestQuery.length).toBeGreaterThan(5);
      expect(data.slides.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('mỗi góc phối cảnh đều có đầy đủ góc nhìn, tiêu đề, mô tả và đường dẫn ảnh hợp lệ', () => {
    Object.values(BUILDING_PERSPECTIVES).forEach((p) => {
      p.slides.forEach((s) => {
        expect(s.id).toBeTruthy();
        expect(s.angle.length).toBeGreaterThan(2);
        expect(s.title.length).toBeGreaterThan(5);
        expect(s.desc.length).toBeGreaterThan(10);
        expect(s.imageUrl).toMatch(/^https:\/\//);
        expect(s.tag.length).toBeGreaterThan(2);
      });
    });
  });

  it('hàm getPerspectivesForType trả về đúng kiểu hoặc fallback về Nhà phố nếu không tìm thấy', () => {
    expect(getPerspectivesForType('Biệt thự').typeName).toBe('Biệt thự');
    expect(getPerspectivesForType('Nhà vườn').typeName).toBe('Nhà vườn');
    expect(getPerspectivesForType('Khai thác du lịch').typeName).toBe('Nhà phố');
  });
});
