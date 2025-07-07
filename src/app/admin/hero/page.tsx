"use client";

import { useHeroApi } from "@/lib/hooks/useHeroApi";
import { ArrowLeft, Save, RefreshCw, Trash2, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

interface HeroFormData {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  background?: string;
  animation?: string;
}

export default function HeroEditor() {
  const [saving, setSaving] = useState(false);

  const {
    loading,
    error,
    data: heroData,
    getAdminHeroData,
    updateHeroData,
    createHeroData,
    deleteHeroData,
    resetHeroData,
    clearError,
  } = useHeroApi();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HeroFormData>();

  useEffect(() => {
    getAdminHeroData();
  }, [getAdminHeroData]);

  useEffect(() => {
    if (heroData) {
      reset(heroData);
    }
  }, [heroData, reset]);

  const onSubmit = async (data: HeroFormData) => {
    setSaving(true);
    clearError();

    try {
      const response = heroData
        ? await updateHeroData(data)
        : await createHeroData(data);

      if (response.success) {
        alert("Hero section updated successfully!");
        await getAdminHeroData();
      } else {
        alert(`Error: ${response.error}`);
      }
    } catch (error) {
      alert("Error updating hero section");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete the hero data?")) {
      return;
    }

    setSaving(true);
    clearError();

    try {
      const response = await deleteHeroData();
      if (response.success) {
        alert("Hero data deleted successfully!");
        await getAdminHeroData();
      } else {
        alert(`Error: ${response.error}`);
      }
    } catch (error) {
      alert("Error deleting hero data");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm("Are you sure you want to reset to default data?")) {
      return;
    }

    setSaving(true);
    clearError();

    try {
      const response = await resetHeroData();
      if (response.success) {
        alert("Hero data reset to default successfully!");
        await getAdminHeroData();
      } else {
        alert(`Error: ${response.error}`);
      }
    } catch (error) {
      alert("Error resetting hero data");
    } finally {
      setSaving(false);
    }
  };

  if (loading && !heroData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin"
            className="inline-flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Edit Hero Section
            </h1>
            <p className="text-gray-600 mt-1">
              Update your hero section content
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => getAdminHeroData()}
            disabled={loading}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
          <button
            onClick={clearError}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title *
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: "Title is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Welcome to My Portfolio"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="subtitle"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Subtitle
              </label>
              <input
                type="text"
                id="subtitle"
                {...register("subtitle")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Full Stack Developer"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                {...register("description")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Passionate about creating amazing web experiences..."
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Image URL
              </label>
              <input
                type="text"
                id="image"
                {...register("image")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="/images/hero.jpg"
              />
            </div>

            <div>
              <label
                htmlFor="ctaText"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                CTA Text
              </label>
              <input
                type="text"
                id="ctaText"
                {...register("ctaText")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="View My Work"
              />
            </div>

            <div>
              <label
                htmlFor="ctaLink"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                CTA Link
              </label>
              <input
                type="text"
                id="ctaLink"
                {...register("ctaLink")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="/projects"
              />
            </div>

            <div>
              <label
                htmlFor="background"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Background
              </label>
              <select
                id="background"
                {...register("background")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="gradient">Gradient</option>
                <option value="solid">Solid</option>
                <option value="image">Image</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="animation"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Animation
              </label>
              <select
                id="animation"
                {...register("animation")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="fade-in">Fade In</option>
                <option value="slide-up">Slide Up</option>
                <option value="zoom-in">Zoom In</option>
              </select>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <button
                onClick={handleReset}
                disabled={saving}
                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Default
              </button>
              <button
                onClick={handleDelete}
                disabled={saving}
                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md shadow-sm text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Data
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
          {heroData && (
            <div className="space-y-4">
              <div>
                <strong>Title:</strong> {heroData.title}
              </div>
              {heroData.subtitle && (
                <div>
                  <strong>Subtitle:</strong> {heroData.subtitle}
                </div>
              )}
              {heroData.description && (
                <div>
                  <strong>Description:</strong> {heroData.description}
                </div>
              )}
              {heroData.image && (
                <div>
                  <strong>Image:</strong> {heroData.image}
                </div>
              )}
              {heroData.ctaText && (
                <div>
                  <strong>CTA:</strong> {heroData.ctaText} → {heroData.ctaLink}
                </div>
              )}
              <div>
                <strong>Background:</strong> {heroData.background}
              </div>
              <div>
                <strong>Animation:</strong> {heroData.animation}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
