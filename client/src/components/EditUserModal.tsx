import { useState, useContext, type FormEvent, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditUserModal({ isOpen, onClose }: EditUserModalProps) {
  const { user, updateUser } = useContext(AuthContext);

  const [username, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 transition-all duration-300">

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
            className={`mt-4 bg-[#0078D4] text-white font-bold py-3 px-6 rounded-lg transition-colors w-full shadow-md ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#0060AA]"
            }`}
          >
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>
      </div>
    </div>
  );
}
