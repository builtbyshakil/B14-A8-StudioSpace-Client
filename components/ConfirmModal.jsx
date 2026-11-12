"use client";

import Modal from "./Modal";

export default function ConfirmModal({
  title,
  message,
  confirmText,
  cancelText = "Keep it",
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="text-base-content/70">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="btn btn-ghost">
          {cancelText}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="btn btn-error"
        >
          {loading ? <span className="loading loading-spinner loading-sm" /> : null}
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}
