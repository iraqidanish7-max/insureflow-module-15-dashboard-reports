import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

type Role = 'admin' | 'agent' | 'customer';
interface NavItem { key: string; label: string; icon: string; children?: { key: string; label: string }[]; group?: string; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  role: Role = 'admin';
  sidebarOpen = false;
  readonly roleLabels: Record<Role, string> = { admin: 'Administrator', agent: 'Insurance Agent', customer: 'Customer Portal' };
  readonly menus: Record<Role, NavItem[]> = {
    admin: [
      { key: 'dashboard', label: 'Dashboard', icon: '◫', group: 'OVERVIEW' },
      { key: 'customers', label: 'Customers', icon: '♙', children: [{ key: 'customer-list', label: 'Customer list' }, { key: 'kyc-verification', label: 'KYC verification' }] },
      { key: 'agents', label: 'Agents', icon: '♧', children: [{ key: 'agent-list', label: 'Agent list' }, { key: 'commission-management', label: 'Commission management' }, { key: 'agent-performance', label: 'Agent performance' }] },
      { key: 'products', label: 'Products', icon: '◇', children: [{ key: 'product-list', label: 'Product list' }, { key: 'product-benefits', label: 'Product benefits' }] },
      { key: 'quotes', label: 'Quotes', icon: '▤', children: [{ key: 'quote-list', label: 'Quote list' }] },
      { key: 'policies', label: 'Policies', icon: '▣', children: [{ key: 'policy-list', label: 'Policy list' }, { key: 'policy-approvals', label: 'Approve / reject' }, { key: 'cancelled-policies', label: 'Cancelled policies' }] },
      { key: 'premiums', label: 'Premiums', icon: '◷', children: [{ key: 'premium-schedule', label: 'Premium schedule' }, { key: 'paid-premiums', label: 'Paid premiums' }, { key: 'due-premiums', label: 'Due premiums' }] },
      { key: 'payments', label: 'Payments', icon: '↗', children: [{ key: 'payment-history', label: 'Payment history' }] },
      { key: 'claims', label: 'Claims', icon: '⚑', children: [{ key: 'claim-list', label: 'Claim list' }, { key: 'claim-decisions', label: 'Approve / reject claims' }, { key: 'claim-settlement', label: 'Claim settlement' }] },
      { key: 'documents', label: 'Documents', icon: '▧', children: [{ key: 'customer-documents', label: 'Customer documents' }, { key: 'claim-documents', label: 'Claim documents' }] },
      { key: 'reports', label: 'Reports', icon: '▥', group: 'INSIGHTS' }
    ],
    agent: [
      { key: 'dashboard', label: 'Dashboard', icon: '◫', group: 'MY WORK' },
      { key: 'customers', label: 'Customers', icon: '♙', children: [{ key: 'customer-list', label: 'Customer list' }] },
      { key: 'quotes', label: 'Quotes', icon: '▤', children: [{ key: 'quote-list', label: 'Quote list / generate quote' }] },
      { key: 'policies', label: 'Policies', icon: '▣', children: [{ key: 'policy-list', label: 'Policy list' }, { key: 'policy-renewal', label: 'Policy renewal' }] },
      { key: 'premiums', label: 'Premiums', icon: '◷', children: [{ key: 'due-premiums', label: 'Due premiums' }, { key: 'paid-premiums', label: 'Paid premiums' }, { key: 'premium-history', label: 'Premium history' }] },
      { key: 'claims', label: 'Claims', icon: '⚑', children: [{ key: 'raise-claim', label: 'Raise claim for customer' }, { key: 'claim-history', label: 'Claim history' }, { key: 'claim-status', label: 'Claim status tracking' }] },
      { key: 'documents', label: 'Documents & earnings', icon: '▧', children: [{ key: 'upload-kyc', label: 'Upload KYC' }, { key: 'upload-claim-document', label: 'Upload claim document' }, { key: 'commission-history', label: 'Commission history' }, { key: 'earning-summary', label: 'Earning summary' }] },
      { key: 'profile', label: 'Profile', icon: '○', group: 'ACCOUNT' },
      { key: 'reports', label: 'Reports', icon: '▥', group: 'INSIGHTS' }
    ],
    customer: [
      { key: 'dashboard', label: 'Dashboard', icon: '◫', group: 'MY INSURANCE' },
      { key: 'profile', label: 'My profile', icon: '○', children: [{ key: 'personal-details', label: 'Personal details' }, { key: 'address-details', label: 'Address details' }, { key: 'nominee-details', label: 'Nominee details' }, { key: 'kyc-documents', label: 'KYC documents' }] },
      { key: 'products', label: 'Insurance products', icon: '◇', children: [{ key: 'health-insurance', label: 'Health insurance' }, { key: 'life-insurance', label: 'Life insurance' }, { key: 'vehicle-insurance', label: 'Vehicle insurance' }] },
      { key: 'quotes', label: 'Quotes', icon: '▤', children: [{ key: 'my-quotes', label: 'My quotes / generate quote' }] },
      { key: 'policies', label: 'My policies', icon: '▣', children: [{ key: 'policy-list', label: 'Policy list' }, { key: 'active-policies', label: 'Active policies' }, { key: 'expired-policies', label: 'Expired policies' }] },
      { key: 'premiums', label: 'Premiums & payments', icon: '◷', children: [{ key: 'pay-premium', label: 'Pay premium' }, { key: 'payment-history', label: 'Payment history' }] },
      { key: 'claims', label: 'Claims', icon: '⚑', children: [{ key: 'raise-claim', label: 'Raise claim' }, { key: 'claim-status', label: 'Claim status' }, { key: 'claim-history', label: 'Claim history' }] },
      { key: 'documents', label: 'Documents', icon: '▧', children: [{ key: 'document-list', label: 'All documents' }, { key: 'upload-documents', label: 'Upload documents' }] },
      { key: 'support', label: 'Support', icon: '?', group: 'HELP', children: [{ key: 'raise-ticket', label: 'Raise ticket' }, { key: 'contact-agent', label: 'Contact agent' }] },
      { key: 'reports', label: 'Reports', icon: '▥', group: 'INSIGHTS' }
    ]
  };
  expanded: Record<string, boolean> = {};
  constructor(private router: Router) {
    const parts = location.pathname.split('/');
    if (['admin', 'agent', 'customer'].includes(parts[1])) this.role = parts[1] as Role;
    this.menus[this.role].forEach(item => this.expanded[item.key] = true);
  }
  get navItems(): NavItem[] { return this.menus[this.role]; }
  get activeSection(): string { return this.router.url.split('/')[2] || 'dashboard'; }
  get activeSubmodule(): string { return this.router.url.split('/')[3] || ''; }
  get pageLabel(): string {
    const item = this.navItems.find(n => n.key === this.activeSection);
    return item?.children?.find(c => c.key === this.activeSubmodule)?.label || item?.label || 'Dashboard';
  }
  changeRole(value: string): void {
    if (!['admin', 'agent', 'customer'].includes(value)) return;
    this.role = value as Role; this.router.navigate(['/', this.role, 'dashboard']);
  }
  toggle(item: string): void { this.expanded[item] = !this.expanded[item]; }
  navigate(section: string, sub?: string): void { this.sidebarOpen = false; this.router.navigate(sub ? ['/', this.role, section, sub] : ['/', this.role, section]); }
}
