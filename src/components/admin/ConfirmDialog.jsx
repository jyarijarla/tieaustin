import { useUI } from '../../contexts/UIContext'

export default function ConfirmDialog() {
  const { confirmState, resolveConfirm } = useUI()

  if (!confirmState) return null
  const { title, message, confirmLabel, tone } = confirmState

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">
        {title && <p className="font-black text-gray-900 text-sm mb-2">{title}</p>}
        <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
        <div className="flex gap-3 pt-6">
          <button
            onClick={() => resolveConfirm(false)}
            className="flex-1 py-2.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => resolveConfirm(true)}
            className="flex-1 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors"
            style={{ background: tone === 'danger' ? '#dc2626' : '#7D1426' }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
