import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import TrendCard from './TrendCard.jsx';
import TrendChart from './TrendChart.jsx';
import MagneticButton from '../ui/MagneticButton.jsx';

export const TrendDashboard = ({ data }) => {
  const trendScore = data?.metrics?.overallScore ?? 0;
  const runwaySynergy = data?.metrics?.runwaySynergy ?? 'Awaiting insights';
  const trendingColors = data?.trendingColors || [];
  const forecast = data?.forecastSuggestions || [];
  const trendingForecast = data?.trendingForecast || [];

  const chartData = useMemo(() => {
    if (!trendingForecast.length) {
      return [
        { label: 'Week 1', value: 52 },
        { label: 'Week 2', value: 61 },
        { label: 'Week 3', value: 68 },
        { label: 'Week 4', value: 73 }
      ];
    }
    return trendingForecast.slice(0, 5).map((item, idx) => ({
      label: item.item?.split(' ')[0] || `Trend ${idx + 1}`,
      value: Math.min(95, 55 + idx * 8)
    }));
  }, [trendingForecast]);

  const scoreOffset = 314 - (314 * trendScore) / 100;

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <div className="glass-card" style={{ padding: '24px', display: 'grid', gap: '20px', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)' }}>
        <div>
          <span className="section-label">Your Wardrobe Trend Score</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginTop: '18px' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
              <svg width="120" height="120">
                <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#C9A84C"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="314"
                  strokeDashoffset={scoreOffset}
                  initial={{ strokeDashoffset: 314 }}
                  animate={{ strokeDashoffset: scoreOffset }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', color: 'var(--color-gold)' }}>{trendScore}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>Score</span>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem' }}>{runwaySynergy}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '6px' }}>
                Above {Math.max(40, trendScore - 5)}% of AURA users.
              </p>
            </div>
          </div>
        </div>

        <div>
          <span className="section-label">Trend Momentum</span>
          <div style={{ marginTop: '16px' }}>
            <TrendChart data={chartData} />
          </div>
        </div>
      </div>

      <div>
        <span className="section-label">Trending Now</span>
        <div style={{ marginTop: '12px', display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {trendingForecast.slice(0, 3).map((trend, index) => (
            <TrendCard key={trend.item || index} trendItem={trend} index={index} />
          ))}
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px', display: 'grid', gap: '20px', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)' }}>
        <div>
          <span className="section-label">Colors of the Season</span>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '14px' }}>
            {trendingColors.slice(0, 6).map((hex) => (
              <div key={hex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: hex, border: '1px solid var(--color-border)' }} />
                <span style={{ fontSize: '0.65rem', color: 'var(--color-muted)' }}>{hex}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="section-label">What to Add Next</span>
          <div style={{ display: 'grid', gap: '12px', marginTop: '14px' }}>
            {forecast.slice(0, 3).map((item, index) => (
              <div key={`${item}-${index}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-ivory)' }}>{item}</span>
                <MagneticButton variant="secondary">Add to Wishlist</MagneticButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendDashboard;
