import { describe, expect, it } from 'vitest';
import { CONSTRUCTION_TIPS, getRandomTipsForStep } from '../../src/domain/constructionTips';

describe('Kho 200+ lưu ý kỹ thuật xây nhà', () => {
  it('chứa tối thiểu 200 lưu ý kỹ thuật thực chiến', () => {
    expect(CONSTRUCTION_TIPS.length).toBeGreaterThanOrEqual(200);
  });

  it('mọi lưu ý đều có đầy đủ id, tiêu đề, nội dung và danh mục', () => {
    CONSTRUCTION_TIPS.forEach((tip) => {
      expect(tip.id).toBeGreaterThan(0);
      expect(tip.title.trim().length).toBeGreaterThan(0);
      expect(tip.content.trim().length).toBeGreaterThan(10);
      expect(tip.category.trim().length).toBeGreaterThan(0);
      expect(tip.step).toBeGreaterThanOrEqual(0);
      expect(tip.step).toBeLessThanOrEqual(6);
    });
  });

  it('hàm getRandomTipsForStep trả về đúng số lượng và không trùng lặp', () => {
    for (let step = 0; step < 7; step++) {
      const tips = getRandomTipsForStep(step, 3);
      expect(tips.length).toBe(3);
      const ids = tips.map((t) => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(tips.length);
    }
  });

  it('hỗ trợ loại trừ các ID đã hiển thị khi re-roll', () => {
    const batch1 = getRandomTipsForStep(1, 2);
    const excludeIds = batch1.map((t) => t.id);
    const batch2 = getRandomTipsForStep(1, 2, excludeIds);
    batch2.forEach((t) => {
      expect(excludeIds).not.toContain(t.id);
    });
  });
});
