import React, { useState } from 'react';

interface FormState {
  name: string;
  email: string;
  description: string;
}

interface OrderDetails {
  orderId: string;
  readyDate: string;
  price: number;
}

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    description: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  /* ---------- Handlery ---------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return setMessage('Vyber soubor (.stl)');

    setIsSubmitting(true);
    setMessage('');
    setOrderDetails(null);

    const body = new FormData();
    body.append('file', file);
    body.append('name', formData.name);
    body.append('email', formData.email);
    body.append('description', formData.description);

    try {
      const res = await fetch('/api/order', { method: 'POST', body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Chyba');

      setMessage('Objednávka úspěšně odeslána ✉️');
      setOrderDetails(data.orderDetails);
      setFormData({ name: '', email: '', description: '' });
      setFile(null);
      
      // Reset file inputu
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (err: any) {
      setMessage(err.message || 'Odeslání selhalo');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewOrder = () => {
    setOrderDetails(null);
    setMessage('');
  };

  /* ---------- UI ---------- */
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">
        3D tisk &ndash; objednávka
      </h1>

      {orderDetails ? (
        /* Zobrazení detailů úspěšné objednávky */
        <div className="space-y-4">
          <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
            <h2 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
              ✅ Objednávka přijata!
            </h2>
            <div className="space-y-2 text-sm text-green-700">
              <p><strong>ID objednávky:</strong> {orderDetails.orderId}</p>
              <p><strong>Bude hotovo:</strong> {orderDetails.readyDate}</p>
              <p><strong>Odhadovaná cena:</strong> {orderDetails.price} Kč</p>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">📧 Co dělat dál?</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Detailní informace jsme poslali na váš email</li>
              <li>• Pošleme SMS, až bude tisk hotový</li>
              <li>• Platba při vyzvednutí (hotově nebo kartou)</li>
              <li>• Nezapomeňte si vzít doklad totožnosti</li>
            </ul>
          </div>
          
          <button
            onClick={handleNewOrder}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded"
          >
            Nová objednávka
          </button>
        </div>
      ) : (
        /* Původní formulář */
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Jméno</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* File */}
          <div>
            <label className="block mb-1 font-medium">3D model (.stl)</label>
            <input
              type="file"
              accept=".stl"
              onChange={handleFileChange}
              required
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Popis <span className="text-gray-500 text-sm">(volitelné)</span></label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Speciální požadavky, materiál, barva..."
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded text-white font-medium transition-colors ${
              isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Odesílám…' : 'Odeslat objednávku'}
          </button>

          {message && !orderDetails && (
            <div
              className={`p-3 mt-4 rounded ${
                message.includes('úspěšně')
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderForm;