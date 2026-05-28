import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import TrendDashboard from '../components/trends/TrendDashboard.jsx';
import LoadingOrb from '../components/ui/LoadingOrb.jsx';
import { useAI } from '../hooks/useAI.js';
import { useWardrobe } from '../hooks/useWardrobe.js';

export const Trends = () => {
  const { items } = useWardrobe();
  const { trends, loadingTrends, runTrendsForecasting, error } = useAI();

  useEffect(() => {
    runTrendsForecasting('SS 2026', 'Paris', items).catch(() => null);
  }, [items, runTrendsForecasting]);

  return (
    <section className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <span className="section-label">Trend Report - SS 2026</span>
        <h2 style={{ fontSize: '2rem', marginTop: '8px' }}>Trend Intelligence</h2>
      </div>

      {loadingTrends && <LoadingOrb message="AURA is forecasting runway signals..." />}

      {error && (
        <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#FF5E5E', fontSize: '0.85rem' }}>
          {error}
        </motion.p>
      )}

      {trends && <TrendDashboard data={trends} />}
    </section>
  );
};

export default Trends;
