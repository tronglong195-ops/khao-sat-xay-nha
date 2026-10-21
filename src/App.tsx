import { lazy, Suspense } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import FormPage from './features/form/FormPage';

// Trang quản trị (kèm Firebase Auth/Firestore) tải riêng, không làm nặng form khách
const AdminPage = lazy(() => import('./features/admin/AdminPage'));
// Trang hồ sơ mẫu (kèm trình xem PDF và phối cảnh 3D)
const SampleDossierPage = lazy(() => import('./features/sample/SampleDossierPage'));

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/admin/*" element={<Suspense fallback={<p className="wrap hint" style={{ padding: 24 }}>Đang tải…</p>}><AdminPage /></Suspense>} />
        <Route path="/ho-so-mau" element={<Suspense fallback={<p className="wrap hint" style={{ padding: 24 }}>Đang tải hồ sơ mẫu…</p>}><SampleDossierPage /></Suspense>} />
        <Route path="/sample-dossier" element={<Suspense fallback={<p className="wrap hint" style={{ padding: 24 }}>Đang tải hồ sơ mẫu…</p>}><SampleDossierPage /></Suspense>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
