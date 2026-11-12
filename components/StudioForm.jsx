"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { AMENITIES, CATEGORIES } from "@/lib/constants";
import { uploadImage } from "@/lib/upload";

export default function StudioForm({ initial, user, onSubmit, submitting, submitLabel }) {
  const [values, setValues] = useState({
    title: initial?.title || "",
    category: initial?.category || CATEGORIES[0].value,
    hourlyRate: initial?.hourlyRate ?? "",
    securityDeposit: initial?.securityDeposit ?? "",
    maxCapacity: initial?.maxCapacity ?? "",
    location: initial?.location || "",
    image: initial?.image || "",
    gallery: initial?.gallery?.slice(1).join("\n") || "",
    amenities: initial?.amenities || [],
    overview: initial?.overview || "",
  });
  const [uploading, setUploading] = useState(false);

  function change(event) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function toggleAmenity(amenity) {
    setValues((current) => ({
      ...current,
      amenities: current.amenities.includes(amenity)
        ? current.amenities.filter((item) => item !== amenity)
        : [...current.amenities, amenity],
    }));
  }

  async function handleFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const url = await uploadImage(file);
      setValues((current) => ({ ...current, image: url }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error.message);
    }

    setUploading(false);
    event.target.value = "";
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!values.image.trim()) {
      toast.error("Please upload an image or paste an image URL");
      return;
    }

    onSubmit({
      title: values.title,
      category: values.category,
      hourlyRate: Number(values.hourlyRate),
      securityDeposit: Number(values.securityDeposit),
      maxCapacity: Number(values.maxCapacity),
      location: values.location,
      image: values.image.trim(),
      gallery: values.gallery.split("\n").map((line) => line.trim()).filter(Boolean),
      amenities: values.amenities,
      overview: values.overview,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface space-y-6 p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-1 block text-sm font-semibold">Studio title</span>
          <input
            name="title"
            required
            value={values.title}
            onChange={change}
            placeholder="Example: Cyclorama White Box"
            className="input input-bordered w-full"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Category</span>
          <select
            name="category"
            value={values.category}
            onChange={change}
            className="select select-bordered w-full"
          >
            {CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.value}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Location / address</span>
          <input
            name="location"
            required
            value={values.location}
            onChange={change}
            placeholder="Area and city"
            className="input input-bordered w-full"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Hourly rate ($)</span>
          <input
            name="hourlyRate"
            type="number"
            min="1"
            step="0.5"
            required
            value={values.hourlyRate}
            onChange={change}
            className="input input-bordered w-full"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Security deposit ($)</span>
          <input
            name="securityDeposit"
            type="number"
            min="0"
            required
            value={values.securityDeposit}
            onChange={change}
            className="input input-bordered w-full"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Max capacity (people)</span>
          <input
            name="maxCapacity"
            type="number"
            min="1"
            required
            value={values.maxCapacity}
            onChange={change}
            className="input input-bordered w-full"
          />
        </label>

        <div className="block">
          <span className="mb-1 block text-sm font-semibold">Upload cover image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={uploading}
            className="file-input file-input-bordered w-full"
          />
          {uploading && <span className="mt-1 block text-sm text-base-content/70">Uploading image...</span>}
        </div>

        <label className="block md:col-span-2">
          <span className="mb-1 block text-sm font-semibold">Image URL</span>
          <input
            name="image"
            type="url"
            value={values.image}
            onChange={change}
            placeholder="https://example.com/studio.jpg"
            className="input input-bordered w-full"
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-1 block text-sm font-semibold">
            More gallery images (one URL per line, optional)
          </span>
          <textarea
            name="gallery"
            rows={3}
            value={values.gallery}
            onChange={change}
            className="textarea textarea-bordered w-full"
          />
        </label>
      </div>

      <div>
        <span className="mb-2 block text-sm font-semibold">Amenities</span>
        <div className="flex flex-wrap gap-2">
          {AMENITIES.map((amenity) => {
            const selected = values.amenities.includes(amenity);

            return (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                aria-pressed={selected}
                className={`btn btn-sm ${selected ? "btn-primary" : "btn-outline"}`}
              >
                {amenity}
              </button>
            );
          })}
        </div>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-semibold">Detailed overview</span>
        <textarea
          name="overview"
          rows={5}
          required
          value={values.overview}
          onChange={change}
          placeholder="Describe the space, the equipment and what it is best for."
          className="textarea textarea-bordered w-full"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Host name</span>
          <input
            readOnly
            value={user.name}
            className="input input-bordered w-full cursor-not-allowed bg-base-200"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Host email</span>
          <input
            readOnly
            value={user.email}
            className="input input-bordered w-full cursor-not-allowed bg-base-200"
          />
        </label>
      </div>

      <button type="submit" disabled={submitting || uploading} className="btn btn-primary w-full md:w-auto">
        {submitting ? <span className="loading loading-spinner loading-sm" /> : null}
        {submitLabel}
      </button>
    </form>
  );
}
