import { useState } from 'react';
import { Note } from '../../components/ui';
import { MAX_FILES, pickFiles } from '../../services/files';

export function FileField({ files, onChange }: { files: File[]; onChange: (f: File[]) => void }) {
  const [rejected, setRejected] = useState<string[]>([]);
  return (
    <div className="sec">
      <label className="file">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1E5A4C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
        </svg>
        <span className="file-t">Tải lên sơ đồ hiện trạng, ảnh sổ đỏ, ảnh lô đất</span>
        <span className="hint">
          {files.length ? 'Đã chọn ' + files.length + '/' + MAX_FILES + ' tệp' : 'Ảnh (JPG, PNG) hoặc PDF – có thể chọn nhiều tệp, tối đa ' + MAX_FILES + ' tệp'}
        </span>
        <input type="file" multiple accept="image/*,application/pdf"
          onChange={(e) => {
            const r = pickFiles([...files, ...Array.from(e.target.files ?? [])]);
            setRejected(r.rejected);
            onChange(r.files);
            e.target.value = '';
          }} />
      </label>
      {files.length > 0 && (
        <ul className="file-list" aria-label="Tệp đã chọn">
          {files.map((f, i) => (
            <li key={f.name + i}>
              <span>{f.name}</span>
              <button type="button" className="file-x" aria-label={'Bỏ tệp ' + f.name} onClick={() => onChange(files.filter((_, j) => j !== i))}>×</button>
            </li>
          ))}
        </ul>
      )}
      {rejected.length > 0 && <Note bad role="status">Không nhận: {rejected.join('; ')}.</Note>}
    </div>
  );
}
