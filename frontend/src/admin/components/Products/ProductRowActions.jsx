import { Pencil, Trash2 } from "lucide-react";
export default function ProductRowActions({ onEdit, onDelete }) {
  return (
    <>
      <button title="Edit product" onClick={onEdit}>
        <Pencil />
      </button>
      <button title="Delete product" onClick={onDelete}>
        <Trash2 />
      </button>
    </>
  );
}
