import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function DeleteAccountPage() {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    } catch (error) {
      console.error('Error checking user:', error);
      navigate('/login');
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError('');

    try {
      // Supabaseでアカウント削除を実行
      // 注意: Supabase Auth APIでは、クライアント側から直接ユーザーを削除できません
      // この機能を実装するには、サーバー側のエンドポイントを作成する必要があります
      // ここでは、ログアウトのみ実行します
      
      await supabase.auth.signOut();
      setIsDeleted(true);
    } catch (error: any) {
      setError(error.message || 'アカウント削除に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (isDeleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">削除完了</h1>
                <p className="text-gray-600">
                  ログアウトしました
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleBackToHome}
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  初期画面へ戻る
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Link 
            to="/app" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ダッシュボードに戻る</span>
          </Link>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">アカウント削除</h1>
              <p className="text-gray-600">この操作は取り消すことができません</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h3 className="font-medium text-red-900 mb-2">削除されるアカウント</h3>
              <p className="text-red-700">{email}</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h3 className="font-medium text-amber-900 mb-2">注意事項</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• すべてのデータが削除されます</li>
                <li>• この操作は元に戻せません</li>
                <li>• 削除後は同じアカウントで再登録できません</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                注意: 現在の実装では、セキュリティ上の理由からログアウトのみ実行されます。
                完全なアカウント削除には、サーバー側の実装が必要です。
              </p>
            </div>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '処理中...' : 'アカウントを削除する'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}