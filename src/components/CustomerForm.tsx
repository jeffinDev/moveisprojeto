import React, { useState } from 'react';
import { User, Phone, Mail, FileText } from 'lucide-react';

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
}

interface CustomerFormProps {
  onSubmit: (customerInfo: CustomerInfo) => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit }) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  const validateForm = () => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(customerInfo);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-xl">
          <User className="text-blue-600" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Dados do Cliente</h3>
          <p className="text-gray-600 text-sm">Preencha seus dados para gerar o orçamento</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <User size={16} />
              Nome Completo *
            </div>
          </label>
          <input
            type="text"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
            className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Digite seu nome completo"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              Telefone *
            </div>
          </label>
          <input
            type="tel"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
            className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="(11) 99999-9999"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              Email *
            </div>
          </label>
          <input
            type="email"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
            className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="seu@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-3"
        >
          <FileText size={20} />
          Gerar PDF para Marceneiro
        </button>
      </form>
    </div>
  );
};