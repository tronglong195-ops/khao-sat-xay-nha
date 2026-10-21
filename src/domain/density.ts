// Mật độ xây dựng tối đa nhà ở riêng lẻ — tham khảo QCVN 01:2021/BXD, nội suy tuyến tính theo diện tích lô.
// Con số chỉ để ước tính; thực tế còn phụ thuộc quy hoạch chi tiết từng khu.
const COV: ReadonlyArray<readonly [number, number]> = [[90, 1], [100, 0.9], [200, 0.7], [300, 0.6], [500, 0.5], [1000, 0.4]];

export function covOf(lot: number): number {
  if (lot <= 90) return 1;
  if (lot >= 1000) return 0.4;
  for (let i = 0; i < COV.length - 1; i++) {
    const a = COV[i], b = COV[i + 1];
    if (lot >= a[0] && lot <= b[0]) return a[1] + ((b[1] - a[1]) * (lot - a[0])) / (b[0] - a[0]);
  }
  return 1;
}
