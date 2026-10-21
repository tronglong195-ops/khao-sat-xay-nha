import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut, type User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Page } from '../../components/Layout';
import { Note } from '../../components/ui';
import { auth, isFirebaseConfigured } from '../../services/firebase';
import { isAdmin } from '../../services/leads';
import { LeadsView } from './LeadsView';

type AuthState = { phase: 'loading' } | { phase: 'out' } | { phase: 'denied'; user: User } | { phase: 'admin'; user: User };

export default function AdminPage() {
  const [st, setSt] = useState<AuthState>({ phase: 'loading' });
  const [err, setErr] = useState('');

  useEffect(() => {
    document.title = 'Quản trị hồ sơ khảo sát';
    if (!isFirebaseConfigured) return;
    return onAuthStateChanged(auth(), async (user) => {
      if (!user) return setSt({ phase: 'out' });
      setSt({ phase: 'loading' });
      setSt((await isAdmin(user.email)) ? { phase: 'admin', user } : { phase: 'denied', user });
    });
  }, []);

  const login = async () => {
    setErr('');
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth(), provider);
    } catch (e) {
      const code = (e as { code?: string }).code;
      // trình duyệt chặn popup (hay gặp trên điện thoại) → chuyển sang đăng nhập bằng chuyển trang
      if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') await signInWithRedirect(auth(), provider);
      else if (code !== 'auth/popup-closed-by-user' && code !== 'auth/cancelled-popup-request') setErr((e as Error).message);
    }
  };

  let body;
  if (!isFirebaseConfigured) {
    body = (
      <div className="card center">
        <h1 style={{ fontSize: 22 }}>Chưa kết nối Firebase</h1>
        <p className="hint">Trang quản trị cần các biến VITE_FIREBASE_* (GitHub → Settings → Secrets and variables → Actions → Variables). Xem docs/DEPLOY.md.</p>
      </div>
    );
  } else if (st.phase === 'loading') {
    body = <p className="hint">Đang kiểm tra đăng nhập…</p>;
  } else if (st.phase === 'out') {
    body = (
      <div className="card center">
        <h1 style={{ fontSize: 22 }}>Quản trị hồ sơ khách hàng</h1>
        <p className="hint">Đăng nhập bằng tài khoản Google đã được cấp quyền quản trị.</p>
        <button type="button" className="btn" onClick={login}>Đăng nhập với Google</button>
        {err && <Note bad role="alert">{err}</Note>}
      </div>
    );
  } else if (st.phase === 'denied') {
    body = (
      <div className="card center">
        <h1 style={{ fontSize: 22 }}>Tài khoản không có quyền</h1>
        <p className="hint">{st.user.email} chưa nằm trong danh sách quản trị. Liên hệ chủ hệ thống để được cấp quyền.</p>
        <button type="button" className="btn ghost" onClick={() => signOut(auth())}>Đăng xuất</button>
      </div>
    );
  } else {
    body = <LeadsView email={st.user.email ?? ''} onSignOut={() => signOut(auth())} />;
  }

  return (
    <Page>
      <main className="wrap" style={{ paddingTop: 32, paddingBottom: 48 }}>{body}</main>
    </Page>
  );
}
