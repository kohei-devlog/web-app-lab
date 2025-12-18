import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, Mail, Clock, LogOut, Trash2, Sun, Moon } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useTheme } from '../../contexts/ThemeContext';

export function DashboardPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [loginTime, setLoginTime] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      setEmail(user.email || '');
      
      // セッション情報からログイン時刻を取得
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const date = new Date(session.user.created_at);
        setLoginTime(date.toLocaleString('ja-JP', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }));
      }
    } catch (error) {
      console.error('Error checking user:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-blue-600 dark:text-blue-400">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto pt-8 space-y-6">
        {/* ヘッダーセクション */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                <Home className="w-9 h-9 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ホーム</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">ようこそ、kohei.devlog へ</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="テーマ切替"
            >
              {theme === 'light' ? (
                <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="w-6 h-6 text-yellow-500" />
              )}
            </button>
          </div>
        </div>

        {/* ユーザー情報セクション */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">アカウント情報</h2>

          <div className="grid gap-4">
            <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-5 flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">メールアドレス</h3>
                <p className="text-gray-700 dark:text-gray-300">{email}</p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-5 flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">アカウント作成日時</h3>
                <p className="text-gray-700 dark:text-gray-300">{loginTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* アクションセクション */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">アカウント管理</h2>

          <div className="space-y-3">
            <Link
              to="/logout"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>ログアウト</span>
            </Link>

            <Link
              to="/delete-account"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              <span>アカウント削除</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
