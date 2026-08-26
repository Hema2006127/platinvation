import type { Metadata } from 'next';
import PackagesPageClient from './PackagesPageClient';

export const metadata: Metadata = {
  title: 'Packages — Luxury Digital Wedding Invitations',
  description: 'Choose your perfect luxury wedding invitation package. Gold, Platinum, and Diamond tiers with premium features for your special day.',
};

export default function PackagesPage() {
  return <PackagesPageClient />;
}
