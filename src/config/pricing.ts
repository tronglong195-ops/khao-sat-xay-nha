// Đơn giá tham khảo (triệu đồng/m² sàn tính tiền).
export interface Pricing {
  tho: number;
  coBan: number;
  kha: number;
  caoCap: number;
  design: number;
}

export const PRICING: Pricing = {
  tho: 4.2,
  coBan: 6.3,
  kha: 7.5,
  caoCap: 9.5,
  design: 0.18
};
