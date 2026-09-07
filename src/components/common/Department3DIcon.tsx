"use client";

import React from "react";
import Image from "next/image";

interface Department3DIconProps {
  id: string;
  image?: string;
  className?: string;
}

export function Department3DIcon({ id, image, className = "w-11 h-11" }: Department3DIconProps) {
  if (image) {
    return (
      <div className={`relative ${className}`}>
        <Image src={image} alt="" fill className="object-contain" />
      </div>
    );
  }

  switch (id) {
    case "cardiology":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="heartGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="55%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#881337" />
            </radialGradient>
            <linearGradient id="heartShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#dc2626" floodOpacity="0.35" />
            </filter>
          </defs>
          <g filter="url(#heartShadow)">
            <path
              d="M32 54C32 54 10 40 10 24C10 16 16.5 10 24.5 10C28.5 10 31.5 12 32 14C32.5 12 35.5 10 39.5 10C47.5 10 54 16 54 24C54 40 32 54 32 54Z"
              fill="url(#heartGrad)"
            />
            {/* Top Gloss Reflection */}
            <path
              d="M23 13C17.5 13 13 17.5 13 23C13 25 14 28 16 30C16 25 19 16 25 14C24.3 13.3 23.6 13 23 13Z"
              fill="url(#heartShine)"
            />
            {/* EKG Pulse Line in pure white */}
            <path
              d="M12 28H23L26 21L30 36L34 24L37 31L40 28H52"
              stroke="#ffffff"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );

    case "neurology":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="brainGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="45%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#9f1239" />
            </radialGradient>
            <filter id="brainShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#f43f5e" floodOpacity="0.3" />
            </filter>
          </defs>
          <g filter="url(#brainShadow)">
            {/* Left & Right Hemisphere Silhouette */}
            <path
              d="M32 12C24 12 14 17 14 28C14 34 17 38 19 41C17 44 18 49 22 51C25 52 28 50 31 47L32 47L33 47C36 50 39 52 42 51C46 49 47 44 45 41C47 38 50 34 50 28C50 17 40 12 32 12Z"
              fill="url(#brainGrad)"
            />
            {/* Sulci (gyri brain convolutions) */}
            <path
              d="M24 20C21 23 21 28 25 30C29 32 30 36 27 40"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeOpacity="0.85"
            />
            <path
              d="M40 20C43 23 43 28 39 30C35 32 34 36 37 40"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeOpacity="0.85"
            />
            <path
              d="M32 15V45"
              stroke="#881337"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.5"
            />
            <circle cx="21" cy="24" r="3" fill="#ffffff" fillOpacity="0.5" />
            <circle cx="43" cy="24" r="3" fill="#ffffff" fillOpacity="0.5" />
          </g>
        </svg>
      );

    case "pediatrics":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="babySkin" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="50%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </radialGradient>
            <filter id="babyShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#f97316" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#babyShadow)">
            {/* Head */}
            <circle cx="32" cy="34" r="18" fill="url(#babySkin)" />
            {/* Little hair curl on top */}
            <path
              d="M32 16C32 11 36 10 35 7C31 8 30 11 31 16"
              stroke="#c2410c"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Cute Smiling Eyes */}
            <path d="M25 31C26.5 29 28.5 29 30 31" stroke="#431407" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M34 31C35.5 29 37.5 29 39 31" stroke="#431407" strokeWidth="2.4" strokeLinecap="round" />
            {/* Rosy Cheeks */}
            <circle cx="24" cy="37" r="3" fill="#ef4444" fillOpacity="0.5" />
            <circle cx="40" cy="37" r="3" fill="#ef4444" fillOpacity="0.5" />
            {/* Happy Smile */}
            <path d="M28 39C29.5 42 34.5 42 36 39" stroke="#7c2d12" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        </svg>
      );

    case "diagnostics":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mriBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <radialGradient id="mriRing" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="85%" stopColor="#b91c1c" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>
            <filter id="mriShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#mriShadow)">
            {/* Main Outer Scanner Ring */}
            <circle cx="32" cy="30" r="20" fill="url(#mriBody)" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Inner Red Diagnostic Aperture */}
            <circle cx="32" cy="30" r="13" fill="url(#mriRing)" />
            {/* Center Dark Tunnel */}
            <circle cx="32" cy="30" r="8" fill="#0f172a" />
            {/* Patient examination bed sliding in */}
            <rect x="22" y="42" width="20" height="9" rx="3" fill="#dc2626" />
            <rect x="18" y="47" width="28" height="4" rx="2" fill="#cbd5e1" />
            {/* Active Sensor Light */}
            <circle cx="32" cy="14" r="2" fill="#38bdf8" />
          </g>
        </svg>
      );

    case "therapy":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="stethChest" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="60%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </radialGradient>
            <linearGradient id="stethTube" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <filter id="stethShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#dc2626" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#stethShadow)">
            {/* Binaural headset tubes */}
            <path
              d="M20 12V22C20 29 25 34 32 34C39 29 44 24 44 22V12"
              stroke="#64748b"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Earpieces */}
            <circle cx="20" cy="12" r="3" fill="#dc2626" />
            <circle cx="44" cy="12" r="3" fill="#dc2626" />
            {/* Lower flexible hose to chestpiece */}
            <path
              d="M32 34V42C32 48 37 51 41 51C45 51 48 48 48 44"
              stroke="url(#stethTube)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Chestpiece Diaphragm */}
            <circle cx="48" cy="42" r="7" fill="url(#stethChest)" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="48" cy="42" r="3" fill="#dc2626" />
          </g>
        </svg>
      );

    case "orthopedics":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="boneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <filter id="boneShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.2" />
            </filter>
          </defs>
          <g filter="url(#boneShadow)">
            {/* Upper Bone Segment (Femur) */}
            <path
              d="M27 12C25 10 21 12 21 16C21 19 25 21 28 22V30H36V22C39 21 43 19 43 16C43 12 39 10 37 12C35 14 29 14 27 12Z"
              fill="url(#boneGrad)"
              stroke="#94a3b8"
              strokeWidth="1.2"
            />
            {/* Joint Cartilage Center Accent (Red) */}
            <rect x="25" y="30" width="14" height="4" rx="2" fill="#ef4444" />
            {/* Lower Bone Segment (Tibia) */}
            <path
              d="M28 34V42C25 43 21 45 21 48C21 52 25 54 27 52C29 50 35 50 37 52C39 54 43 52 43 48C43 45 39 43 36 42V34H28Z"
              fill="url(#boneGrad)"
              stroke="#94a3b8"
              strokeWidth="1.2"
            />
          </g>
        </svg>
      );

    case "laboratory":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="flaskGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="flaskLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            <filter id="flaskShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#dc2626" floodOpacity="0.3" />
            </filter>
          </defs>
          <g filter="url(#flaskShadow)">
            {/* Flask Glass Outline */}
            <path
              d="M27 10H37V22L49 44C52 49 48 54 42 54H22C16 54 12 49 15 44L27 22V10Z"
              fill="url(#flaskGlass)"
              stroke="#94a3b8"
              strokeWidth="2"
            />
            {/* Liquid inside */}
            <path
              d="M18 41L22 48C23 50 25 51 28 51H36C39 51 41 50 42 48L46 41C42 43 37 39 32 41C27 43 22 39 18 41Z"
              fill="url(#flaskLiquid)"
            />
            {/* Bubbles */}
            <circle cx="28" cy="38" r="2.2" fill="#ffffff" fillOpacity="0.85" />
            <circle cx="35" cy="34" r="1.8" fill="#ffffff" fillOpacity="0.85" />
            <circle cx="32" cy="45" r="2.5" fill="#ffffff" fillOpacity="0.7" />
            {/* Top Rim */}
            <rect x="25" y="8" width="14" height="4" rx="2" fill="#64748b" />
          </g>
        </svg>
      );

    case "endocrinology":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="shieldGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="55%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>
            <filter id="shieldShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#dc2626" floodOpacity="0.35" />
            </filter>
          </defs>
          <g filter="url(#shieldShadow)">
            {/* Heraldic Shield */}
            <path
              d="M32 10L48 16V31C48 42 41 51 32 54C23 51 16 42 16 31V16L32 10Z"
              fill="url(#shieldGrad)"
              stroke="#ffffff"
              strokeWidth="2"
            />
            {/* White 3D Cross */}
            <path
              d="M28 22H36V28H42V36H36V42H28V36H22V28H28V22Z"
              fill="#ffffff"
            />
          </g>
        </svg>
      );

    case "surgery":
    default:
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="surgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <filter id="surgShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#dc2626" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#surgShadow)">
            {/* Circular precision target */}
            <circle cx="32" cy="32" r="20" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="32" cy="32" r="13" fill="url(#surgGrad)" />
            <circle cx="32" cy="32" r="5" fill="#ffffff" />
            {/* Precision Crosshairs */}
            <path d="M32 8V20M32 44V56M8 32H20M44 32H56" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      );
  }
}
