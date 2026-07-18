import portfolioData from '../data/portfolio.json';
import type { PortfolioData } from '../types/portfolio';

const data = portfolioData as PortfolioData;

/**
 * Single source of truth for all portfolio content.
 * Components should never hardcode profile/experience/project/testimonial
 * copy — pull it from here instead, so editing src/data/portfolio.json
 * is the only thing needed to update the site.
 */
export function usePortfolio(): PortfolioData {
  return data;
}
