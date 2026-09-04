export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatNumber(num: number, decimals: number = 0): string {
  return num.toFixed(decimals);
}

export function calculateConnectivityChange(before: number, after: number): number {
  return after - before;
}

export function getRiskLevel(connectivityLoss: number): 'low' | 'medium' | 'high' | 'critical' {
  if (connectivityLoss >= 20) return 'critical';
  if (connectivityLoss >= 10) return 'high';
  if (connectivityLoss >= 5) return 'medium';
  return 'low';
}

export function getRiskColor(risk: string): string {
  switch (risk) {
    case 'critical': return 'text-red-600';
    case 'high': return 'text-orange-600';
    case 'medium': return 'text-yellow-600';
    case 'low': return 'text-green-600';
    default: return 'text-gray-600';
  }
}

export function getEcologicalValueColor(value: string): string {
  switch (value) {
    case 'critical': return 'text-red-600';
    case 'high': return 'text-orange-600';
    case 'medium': return 'text-yellow-600';
    case 'low': return 'text-green-600';
    default: return 'text-gray-600';
  }
}
