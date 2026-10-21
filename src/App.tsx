import { lazy, Suspense } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import FormPage from './features/form/FormPage';

// Trang quản trị (kèm Firebase Auth/Firestore) tải riêng, không làm nặng form khách
const AdminPage = lazy(() => import('./features/admin/AdminPage'));

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/admin/*" element={<Suspense fallback={<p className="wrap hint" style={{ padding: 24 }}>Đang tải…</p>}><AdminPage /></Suspense>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
