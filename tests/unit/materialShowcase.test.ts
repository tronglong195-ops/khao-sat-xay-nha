import { describe, expect, it } from 'vitest';
import { MATERIAL_SHOWCASE } from '../../src/domain/materialShowcase';

describe('Material Showcase Domain', () => {
  it('danh sách vật liệu hoàn thiện có ít nhất 8 vật liệu phổ biến', () => {
    expect(MATERIAL_SHOWCASE.length).toBeGreaterThanOrEqual(8);
  });

  it('mỗi vật liệu đều có đầy đủ tên, nhóm, mô tả, ưu điểm và url hình ảnh thực tế', () => {
    MATERIAL_SHOWCASE.forEach((mat) => {
      expect(mat.id).toBeTruthy();
      expect(mat.name.length).toBeGreaterThan(5);
      expect(mat.category.length).toBeGreaterThan(2);
      expect(mat.desc.length).toBeGreaterThan(10);
      expect(mat.pros.length).toBeGreaterThan(10);
      expect(mat.imageUrl).toMatch(/^https:\/\//);
      expect(mat.pinterestQuery.length).toBeGreaterThan(5);
    });
  });
});
