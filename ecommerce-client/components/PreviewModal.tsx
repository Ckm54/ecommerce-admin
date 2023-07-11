"use client";

import React from "react";
import usePreviewModal from "@/hooks/usePreviewModal";

import Modal from "@/components/ui/Modal";
import Gallery from "@/components/Gallery";
import ProductInfo from "@/components/ProductInfo";

const PreviewModal = () => {
  const previewModal = usePreviewModal();

  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 pay-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery images={product.images} />
        </div>

        <div className="sm:col-span-8 lg:col-span-7">
          <ProductInfo product={product} />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;