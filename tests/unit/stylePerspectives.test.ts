import { describe, expect, it } from 'vitest';
import { STYLES } from '../../src/domain/options';
import { STYLE_PERSPECTIVES, getPerspectivesForStyle } from '../../src/domain/stylePerspectives';

describe('Style Perspectives Domain', () => {
  it('cung cấp đầy đủ dữ liệu phối cảnh cho toàn bộ 7 phong cách trong STYLES', () => {
    STYLES.forEach((st) => {
      const data = STYLE_PERSPECTIVES[st.id];
      expect(data).toBeDefined();
      expect(data.name).toBe(st.name);
      expect(data.summary.length).toBeGreaterThan(10);
      expect(data.pinterestQuery.length).toBeGreaterThan(5);
      expect(data.slides.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('mỗi slide phong cách đều có id, góc nhìn, tiêu đề, mô tả và url hợp lệ', () => {
    Object.values(STYLE_PERSPECTIVES).forEach((sp) => {
      sp.slides.forEach((slide) => {
        expect(slide.id).toBeTruthy();
        expect(slide.angle.length).toBeGreaterThan(2);
        expect(slide.title.length).toBeGreaterThan(5);
        expect(slide.desc.length).toBeGreaterThan(10);
        expect(slide.imageUrl.length).toBeGreaterThan(5);
        expect(slide.tag.length).toBeGreaterThan(2);
      });
    });
  });

  it('hàm getPerspectivesForStyle trả về đúng phong cách hoặc fallback về hien-dai', () => {
    expect(getPerspectivesForStyle('indochine').styleId).toBe('indochine');
    expect(getPerspectivesForStyle('tan-co-dien').styleId).toBe('tan-co-dien');
    expect(getPerspectivesForStyle('wabi-sabi-custom').styleId).toBe('hien-dai');
  });
});
