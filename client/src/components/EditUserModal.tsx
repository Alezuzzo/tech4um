import { useState, useContext, type FormEvent, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditUserModal({ isOpen, onClose }: EditUserModalProps) {
  const { user, updateUser, logout } = useContext(AuthContext);

  const [username, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ======== CAMPOS E ESTADOS DA ALTERAÇÃO DE SENHA ========
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // ======== CAMPOS E ESTADO PARA DELETAR CONTA ========
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  // Preencher os inputs com os dados atuais do usuário
  useEffect(() => {
    if (user) {
      setNickname(user.username || "");
      setEmail(user.email || "");
    }
  }, [user, isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.patch("/users/me", {
        username,
        email
      });

      updateUser(response.data.user);

      onClose();
    } catch (err: any) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        "Erro ao atualizar dados do perfil.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ========== ALTERAR SENHA ==========
  const handleChangePassword = async () => {
    setPasswordMessage("");

    if (newPassword !== confirmPassword) {
      return setPasswordMessage("As senhas não conferem.");
    }

    try {
      await api.patch("/users/me/password", {
        currentPassword,
        newPassword
      });

      setPasswordMessage("Senha alterada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err: any) {
      const msg = err.response?.data?.message || "Erro ao alterar senha.";
      setPasswordMessage(msg);
    }
  };

  // ========== DELETAR CONTA ==========
  const handleDeleteAccount = async () => {
    setDeleteMessage("");

    try {
      // Aqui deve ser um DELETE e não POST
      await api.delete("/users/me", {
        data: { password: deletePassword } // Passando a senha no corpo da requisição
      });

      logout();  // Chama o logout para garantir que o usuário seja deslogado
      window.location.reload();  // Atualiza a página para refletir que a conta foi deletada

    } catch (err: any) {
      const msg = err.response?.data?.message || "Erro ao excluir conta.";
      setDeleteMessage(msg);  // Exibe a mensagem de erro, caso ocorra
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 transition-all duration-300 max-h-[85vh] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold"
        >
          ✕
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#0078D4] mb-2">
            Editar Perfil
          </h2>
          <p className="text-gray-500 font-medium text-sm">
            Atualize seu nome de exibição e e-mail.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100 animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* username */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#0078D4] ml-1">
              Nome de exibição
            </label>
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#0078D4] focus:ring-1 focus:ring-[#0078D4] transition-all text-sm placeholder-gray-400"
              value={username}
              onChange={(e) => setNickname(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#0078D4] ml-1">
              E-mail
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#0078D4] focus:ring-1 focus:ring-[#0078D4] transition-all text-sm placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 bg-[#0078D4] text-white font-bold py-3 px-6 rounded-lg transition-colors w-full shadow-md ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#0060AA]"
              }`}
          >
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>

        {/* ======== ALTERAR SENHA ======== */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-[#0078D4] mb-4">Alterar senha</h3>

          <input
            type="password"
            placeholder="Senha atual"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Nova senha"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirmar nova senha"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {passwordMessage && (
            <p className="text-sm text-red-500 mb-2">{passwordMessage}</p>
          )}

          <button
            onClick={handleChangePassword}
            className="w-full bg-gray-600 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors shadow-md"
          >
            Alterar senha
          </button>
        </div>

        {/* ======== EXCLUIR CONTA ======== */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-red-600 mb-2">Excluir conta</h3>

          <p className="text-sm text-gray-600">
            Esta ação é permanente e não pode ser desfeita.
          </p>

          <input
            type="password"
            placeholder="Digite sua senha para confirmar"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 mt-3 mb-2"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
          />

          {deleteMessage && (
            <p className="text-sm text-red-500 mb-2">{deleteMessage}</p>
          )}

          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-md"
          >
            Excluir minha conta
          </button>
        </div>

      </div>
    </div>
  );
}
