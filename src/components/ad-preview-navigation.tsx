"use client";

import { FormData } from "@/app/(adgen)/create-ad/(formGroup)/ad-form/_components/image-ad-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface AdPreviewNavigationProps {
  className?: string;
  isLoading?: boolean;
  onGenerateNewAd?: (data: FormData) => void; // Updated to accept FormData parameter
}

const AdPreviewNavigation: React.FC<AdPreviewNavigationProps> = ({
  className = "",
  onGenerateNewAd,
  isLoading,
}) => {
  const router = useRouter();
  const handleBack = () => {
    router.push("/create-ad/ad-form?type=image");
    // try {
    // } catch {
    //   router.back();
    // }
  };

  const handleGoHome = () => {
    localStorage.removeItem("imageAdData");
    router.push("/");
  };

  const handleGenerateNewAd = () => {
    if (isLoading) return;
    try {
      const storedData = localStorage.getItem("imageAdData");
      if (storedData && onGenerateNewAd) {
        const parsedData = JSON.parse(storedData) as FormData;
        onGenerateNewAd(parsedData);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center w-full">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer p-0"
          type="button"
        >
          <Image
            src="/arrow-left.svg"
            alt="Back"
            className="w-6 h-6 mr-2"
            width={24}
            height={24}
          />
          <span className="text-[#121316] font-medium text-base leading-6">
            Back
          </span>
        </button>

        {/* Vertical line after back button - desktop only */}
        <div className="hidden md:block w-px h-8 bg-gray-200"></div>

        {/* Generate New Ad button - hidden on mobile */}
        <button
          onClick={handleGenerateNewAd}
          className="hidden md:flex items-center text-[#B800B8] hover:text-[#B800B8] font-medium cursor-pointer"
          type="button"
        >
          <span>Generate New Ad</span>
          <Image
            src="/rotate-cw.svg"
            alt="Generate"
            className="w-5 h-5 ml-2"
            width={20}
            height={20}
          />
        </button>

        {/* Vertical line after generate button - desktop only */}
        <div className="hidden md:block w-px h-8 bg-gray-200"></div>

        <button
          onClick={handleGoHome}
          className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
          type="button"
        >
          <Image
            src="/home.svg"
            alt="Home"
            className="w-5 h-5 mr-2"
            width={20}
            height={20}
          />
          <span className="text-[#121316] font-medium text-base leading-6">
            Go back Home
          </span>
        </button>
      </div>

      {/* Horizontal line underneath the entire navigation */}
      <div className="hidden md:block h-0.5 bg-gray-200 w-full mt-8"></div>
    </div>
  );
};

// Separate component for mobile generate button
export const MobileGenerateButton: React.FC<{
  onGenerateNewAd?: (data: FormData) => void; // Updated to accept FormData parameter
  className?: string;
}> = ({ onGenerateNewAd, className = "" }) => {
  const handleGenerateNewAd = () => {
    try {
      const storedData = localStorage.getItem("imageAdData");
      if (storedData && onGenerateNewAd) {
        const parsedData = JSON.parse(storedData) as FormData;
        onGenerateNewAd(parsedData);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  return (
    <button
      onClick={handleGenerateNewAd}
      className={`md:hidden flex items-center justify-center text-[#B800B8] hover:text-[#B800B8] font-medium cursor-pointer w-full py-3 mt-6 border-0 rounded-lg ${className}`}
      type="button"
    >
      <span>Generate New Ad</span>
      <Image
        src="/rotate-cw.svg"
        alt="Generate"
        className="w-5 h-5 ml-2"
        width={20}
        height={20}
      />
    </button>
  );
};

export default AdPreviewNavigation;
