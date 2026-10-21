import {
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  type User
} from 'firebase/auth';
import { useEffect, useState, useCallback } from 'react';
import { Page } from '../../components/Layout';
import { Note } from '../../components/ui';
import { auth, isFirebaseConfigured } from '../../services/firebase';
import { checkAdminDetails, type AdminCheckResult } from '../../services/leads';
import { LeadsView } from './LeadsView';

type AuthState =
  | { phase: 'loading'; message?: string }
  | { phase: 'out' }
  | { phase: 'denied'; user: User; checkResult?: AdminCheckResult }
  | { phase: 'admin'; user: User };

function friendlyAuthError(e: unknown): string {
  if (!e) return '';
  const code = (e as { code?: string })?.code || '';
  const msg = (e as Error)?.message || String(e);

  if (code === 'auth/unauthorized-domain') {
    const host = typeof window !== 'undefined' ? window.location.hostname : 'domain';
    return `Tên miền "${host}" chưa được cấp phép trong Firebase! Vui lòng vào Firebase Console ➔ Authentication ➔ Settings ➔ Authorized domains và bấm "Add domain" thêm "${host}".`;
  }
  if (code === 'auth/operation-not-allowed') {
    return 'Nhà cung cấp Google chưa được kích hoạt trong Firebase Console ➔ Authentication ➔ Sign-in method ➔ Bật Google.';
  }
  if (code === 'auth/popup-blocked') {
    return 'Trình duyệt đã chặn cửa sổ Popup. Vui lòng bấm nút "Đăng nhập Google (Chuyển trang)" bên dưới.';
  }
  if (code === 'auth/popup-closed-by-user') {
    return 'Bạn đã đóng cửa sổ đăng nhập Google trước khi hoàn tất.';
  }
  if (code === 'auth/cancelled-popup-request') {
    return 'Yêu cầu đăng nhập đã được thay thế bằng yêu cầu mới.';
  }
  if (code === 'auth/network-request-failed') {
    return 'Lỗi kết nối mạng hoặc cookie bên thứ ba bị chặn. Hãy bấm "Đăng nhập Google (Chuyển trang)" để thử lại.';
  }
  if (code === 'auth/invalid-api-key') {
    return 'Khóa API Firebase không hợp lệ hoặc bị giới hạn trong Google Cloud Console.';
  }
  if (code === 'auth/internal-error') {
    return 'Lỗi nội bộ Firebase Authentication. Vui lòng tải lại trang và thử lại.';
  }
  return `Lỗi đăng nhập (${code || 'chưa rõ'}): ${msg}`;
}

export default function AdminPage() {
  const [st, setSt] = useState<AuthState>({ phase: 'loading', message: 'Đang kiểm tra trạng thái đăng nhập…' });
  const [err, setErr] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Kiểm tra quyền admin của user
  const verifyUser = useCallback(async (user: User) => {
    setSt({ phase: 'loading', message: 'Đang xác thực quyền quản trị trong hệ thống…' });
    const check = await checkAdminDetails(user.email);
    if (check.ok) {
      setSt({ phase: 'admin', user });
    } else {
      setSt({ phase: 'denied', user, checkResult: check });
    }
  }, []);

  useEffect(() => {
    document.title = 'Quản trị hồ sơ khảo sát';
    if (!isFirebaseConfigured) return;

    // Xử lý kết quả trả về từ redirect (đăng nhập chuyển trang trên điện thoại/Safari)
    getRedirectResult(auth())
      .then(async (result) => {
        if (result?.user) {
          await verifyUser(result.user);
        }
      })
      .catch((e) => {
        console.error('Redirect sign-in error:', e);
        setErr(friendlyAuthError(e));
      });

    // Lắng nghe thay đổi trạng thái đăng nhập
    return onAuthStateChanged(auth(), async (user) => {
      if (!user) {
        setSt({ phase: 'out' });
        return;
      }
      await verifyUser(user);
    });
  }, [verifyUser]);

  // Đăng nhập bằng Popup hoặc Redirect
  const handleLogin = async (mode: 'popup' | 'redirect') => {
    setErr('');
    setIsSubmitting(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      if (mode === 'popup') {
        const res = await signInWithPopup(auth(), provider);
        if (res.user) {
          await verifyUser(res.user);
        }
      } else {
        await signInWithRedirect(auth(), provider);
      }
    } catch (e) {
      const code = (e as { code?: string }).code;
      if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
        // Tự động chuyển sang redirect nếu popup bị chặn
        try {
          await signInWithRedirect(auth(), provider);
          return;
        } catch (redirectErr) {
          setErr(friendlyAuthError(redirectErr));
        }
      } else if (code !== 'auth/popup-closed-by-user' && code !== 'auth/cancelled-popup-request') {
        setErr(friendlyAuthError(e));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  let body;
  if (!isFirebaseConfigured) {
    body = (
      <div className="card center">
        <h1 style={{ fontSize: 22 }}>Chưa kết nối Firebase</h1>
        <p className="hint">
          Trang quản trị cần các biến cấu hình Firebase (VITE_FIREBASE_*). Vui lòng kiểm tra lại cấu hình trên GitHub Actions Secrets/Variables.
        </p>
      </div>
    );
  } else if (st.phase === 'loading') {
    body = (
      <div className="card center" style={{ padding: '40px 20px' }}>
        <p className="hint" style={{ fontSize: 15 }}>⏳ {st.message || 'Đang kiểm tra đăng nhập…'}</p>
      </div>
    );
  } else if (st.phase === 'out') {
    const isDomainError = err.includes('Authorized domains') || err.includes('auth/unauthorized-domain');
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

    body = (
      <div className="card center" style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: 22, margin: '0 0 8px' }}>Quản trị hồ sơ khách hàng</h1>
        <p className="hint" style={{ margin: '0 0 20px', lineHeight: 1.5 }}>
          Đăng nhập bằng tài khoản Google để xem và quản lý danh sách hồ sơ khảo sát thiết kế xây nhà.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 360, margin: '0 auto' }}>
          <button
            type="button"
            className="btn"
            disabled={isSubmitting}
            onClick={() => handleLogin('popup')}
            style={{ width: '100%', justifyContent: 'center', minHeight: 44, fontSize: 14 }}
          >
            <span>🔑</span>
            <span>{isSubmitting ? 'Đang kết nối Google…' : 'Đăng nhập với Google (Popup)'}</span>
          </button>

          <button
            type="button"
            className="btn ghost"
            disabled={isSubmitting}
            onClick={() => handleLogin('redirect')}
            style={{ width: '100%', justifyContent: 'center', minHeight: 40, fontSize: 13 }}
            title="Dành cho điện thoại hoặc trình duyệt chặn mở cửa sổ Popup"
          >
            <span>📱</span>
            <span>Đăng nhập chuyển trang (Điện thoại / Safari)</span>
          </button>
        </div>

        {err && (
          <div style={{ marginTop: 20, textAlign: 'left' }}>
            <Note bad role="alert">
              <strong style={{ display: 'block', marginBottom: 4 }}>⚠️ Lỗi đăng nhập:</strong>
              <span>{err}</span>
              {isDomainError && (
                <div style={{ marginTop: 8, fontSize: 12.5, lineHeight: 1.4 }}>
                  👉 <strong>Hướng dẫn thêm tên miền ủy quyền:</strong>
                  <ol style={{ margin: '4px 0 0', paddingLeft: 20 }}>
                    <li>Mở Firebase Console ➔ Chọn dự án <strong>khao-sat-xay-nha</strong>.</li>
                    <li>Vào mục <strong>Authentication</strong> ➔ Tab <strong>Settings</strong> ➔ <strong>Authorized domains</strong>.</li>
                    <li>Bấm nút <strong>Add domain</strong>, điền: <code style={{ background: '#eee', padding: '2px 4px', borderRadius: 4 }}>{hostname}</code></li>
                    <li>Bấm <strong>Save</strong> rồi quay lại đây thử đăng nhập lại.</li>
                  </ol>
                </div>
              )}
            </Note>
          </div>
        )}
      </div>
    );
  } else if (st.phase === 'denied') {
    body = (
      <div className="card center" style={{ maxWidth: 540, margin: '0 auto', textAlign: 'left' }}>
        <h1 style={{ fontSize: 20, color: '#C62828', margin: '0 0 10px', textAlign: 'center' }}>
          🔒 Tài khoản chưa được cấp quyền quản trị
        </h1>
        <p style={{ margin: '0 0 14px', fontSize: 14, color: 'var(--ink)', lineHeight: 1.5 }}>
          Bạn đã đăng nhập thành công với tài khoản: <strong style={{ color: 'var(--accent)' }}>{st.user.email}</strong>
        </p>

        {st.checkResult?.message && (
          <div style={{
            background: '#FDF1EB',
            border: '1px solid #E8B99D',
            borderRadius: 8,
            padding: '10px 12px',
            fontSize: 13,
            color: '#8A3F0C',
            marginBottom: 16
          }}>
            <strong>Chi tiết kiểm tra:</strong> {st.checkResult.message}
          </div>
        )}

        <div style={{
          background: 'var(--accent-soft)',
          border: '1px solid var(--accent-soft-line)',
          borderRadius: 8,
          padding: '12px 14px',
          fontSize: 13,
          color: 'var(--ink)',
          lineHeight: 1.5,
          marginBottom: 18
        }}>
          <strong>💡 Hướng dẫn cấp quyền Quản trị:</strong>
          <ol style={{ margin: '6px 0 0', paddingLeft: 20 }}>
            <li>Mở Firebase Console ➔ <strong>Firestore Database</strong>.</li>
            <li>Tạo Collection có tên: <code style={{ background: '#fff', padding: '2px 4px', borderRadius: 4 }}>config</code></li>
            <li>Tạo Document có ID: <code style={{ background: '#fff', padding: '2px 4px', borderRadius: 4 }}>admins</code></li>
            <li>
              Thêm trường (Field): tên là <code style={{ background: '#fff', padding: '2px 4px', borderRadius: 4 }}>emails</code>, chọn kiểu <strong>array</strong>, thêm giá trị là chuỗi email của bạn: <code style={{ background: '#fff', padding: '2px 4px', borderRadius: 4 }}>{st.user.email}</code>
            </li>
            <li>Bấm <strong>Save</strong> rồi bấm nút <strong>"Kiểm tra lại quyền"</strong> bên dưới.</li>
          </ol>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn"
            onClick={() => verifyUser(st.user)}
          >
            🔄 Kiểm tra lại quyền
          </button>
          <button
            type="button"
            className="btn ghost"
            onClick={() => signOut(auth())}
          >
            Đăng xuất tài khoản khác
          </button>
        </div>
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
