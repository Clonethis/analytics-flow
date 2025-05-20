'use client';
import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

const clarityProjectId = "rmolqmm134";

export default function ClarityAnalytics() {
  useEffect(() => {
    Clarity.init(clarityProjectId); // Replace with your Clarity ID
  }, []);
  return null;
}