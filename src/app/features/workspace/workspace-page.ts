import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Row { id: string; name: string; detail: string; status: string; date: string; amount?: string; type?: string; }
interface PageConfig { title: string; subtitle: string; action: string; columns: string[]; }
@Component({
  selector: 'app-workspace-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workspace-page.html',
  styleUrl: './workspace-page.css'
})
export class WorkspacePage {
  role = 'admin';
  section = 'dashboard';
  submodule = '';
  searchText = '';
  statusFilter = 'All statuses';
  modalOpen = false;
  detailOpen = false;
  toast = '';
  selectedRow: Row | null = null;
  formName = '';
  formDetail = '';
  formType = 'Health';
  readonly configs: Record<string, PageConfig> = {
    customers: { title: 'Customers', subtitle: 'Manage customer profiles, KYC progress and account activity.', action: 'Add customer', columns: ['Customer', 'Customer ID', 'Joined', 'KYC status', 'Actions'] },
    agents: { title: 'Agent management', subtitle: 'Manage your distribution network, commissions and performance.', action: 'Add agent', columns: ['Agent', 'Agent ID', 'Customers', 'Performance', 'Status'] },
    products: { title: 'Insurance products', subtitle: 'Configure plans, benefits and coverage available to your customers.', action: 'Add product', columns: ['Product', 'Category', 'Coverage', 'Premium from', 'Status'] },
    quotes: { title: 'Quote management', subtitle: 'Review generated quotes and help customers choose the right cover.', action: 'Create quote', columns: ['Quote', 'Customer', 'Product', 'Created', 'Status'] },
    policies: { title: 'Policy management', subtitle: 'Track policy lifecycle, approvals, renewals and cancellations.', action: 'Create policy', columns: ['Policy', 'Policyholder', 'Product', 'Premium', 'Status'] },
    premiums: { title: 'Premium schedule', subtitle: 'Monitor upcoming instalments, paid premiums and overdue balances.', action: 'Create schedule', columns: ['Schedule', 'Policyholder', 'Due date', 'Amount', 'Status'] },
    payments: { title: 'Payment transactions', subtitle: 'Review premium collections and transaction-level details.', action: 'Record payment', columns: ['Transaction', 'Customer', 'Date', 'Amount', 'Status'] },
    claims: { title: 'Claims centre', subtitle: 'Review claims, track decisions and move approved claims to settlement.', action: 'Raise claim', columns: ['Claim', 'Policyholder', 'Claim type', 'Submitted', 'Status'] },
    documents: { title: 'Document centre', subtitle: 'Keep customer KYC, policy and claim documents organised.', action: 'Upload document', columns: ['Document', 'Owner', 'Category', 'Uploaded', 'Status'] },
    reports: { title: 'Reports & insights', subtitle: 'Understand portfolio health, operational trends and team performance.', action: 'Export report', columns: ['Report', 'Category', 'Last generated', 'Owner', 'Status'] },
    profile: { title: 'My profile', subtitle: 'Keep your personal and account information up to date.', action: 'Edit profile', columns: ['Information', 'Value', 'Verification', 'Updated', 'Actions'] },
    support: { title: 'Help & support', subtitle: 'Get help with your insurance, contact your agent or raise a support ticket.', action: 'Raise a ticket', columns: ['Ticket', 'Subject', 'Created', 'Assigned to', 'Status'] }
  };
  readonly data: Record<string, Row[]> = {
    customers: [
      {id:'CUS-1048',name:'Olivia Rhye',detail:'olivia.rhye@email.com',status:'Verified',date:'Oct 21, 2026',type:'Individual'},
      {id:'CUS-1047',name:'Phoenix Baker',detail:'phoenix.baker@email.com',status:'In review',date:'Oct 20, 2026',type:'Individual'},
      {id:'CUS-1046',name:'Lana Steiner',detail:'lana.steiner@email.com',status:'Verified',date:'Oct 19, 2026',type:'Family'},
      {id:'CUS-1045',name:'Demi Wilkinson',detail:'demi.w@email.com',status:'Pending',date:'Oct 18, 2026',type:'Individual'},
      {id:'CUS-1044',name:'Candice Wu',detail:'candice.wu@email.com',status:'Verified',date:'Oct 17, 2026',type:'Family'}
    ],
    agents: [
      {id:'AGT-0201',name:'Priya Sharma',detail:'priya.sharma@insureflow.in',status:'Active',date:'98% performance',amount:'₹1.24L',type:'48 customers'},
      {id:'AGT-0202',name:'Rahul Mehta',detail:'rahul.mehta@insureflow.in',status:'Active',date:'92% performance',amount:'₹98,400',type:'36 customers'},
      {id:'AGT-0203',name:'Neha Patil',detail:'neha.patil@insureflow.in',status:'On leave',date:'87% performance',amount:'₹76,200',type:'29 customers'}
    ],
    products: [
      {id:'PRD-001',name:'Health Secure Plus',detail:'Cashless network · 8,500+ hospitals',status:'Active',date:'From ₹8,499/yr',amount:'₹10L',type:'Health'},
      {id:'PRD-002',name:'Life Protect',detail:'Term life · Flexible cover',status:'Active',date:'From ₹6,200/yr',amount:'₹1Cr',type:'Life'},
      {id:'PRD-003',name:'DriveSure Motor',detail:'Cashless repairs · Roadside support',status:'Active',date:'From ₹4,100/yr',amount:'₹15L',type:'Vehicle'},
      {id:'PRD-004',name:'Family Health Max',detail:'Cashless + reimbursement',status:'Draft',date:'From ₹12,500/yr',amount:'₹25L',type:'Health'}
    ],
    quotes: [
      {id:'QTE-2408',name:'Olivia Rhye',detail:'Health Secure Plus',status:'Awaiting decision',date:'Oct 22, 2026',amount:'₹12,450',type:'Health'},
      {id:'QTE-2407',name:'Lana Steiner',detail:'Life Protect',status:'Converted',date:'Oct 21, 2026',amount:'₹8,900',type:'Life'},
      {id:'QTE-2406',name:'Phoenix Baker',detail:'DriveSure Motor',status:'Expired',date:'Oct 19, 2026',amount:'₹6,200',type:'Vehicle'}
    ],
    policies: [
      {id:'POL-88301',name:'Olivia Rhye',detail:'Health Secure Plus',status:'Active',date:'Renews Oct 2027',amount:'₹12,450/yr',type:'Health'},
      {id:'POL-88300',name:'Lana Steiner',detail:'Life Protect',status:'Pending approval',date:'Created Oct 21',amount:'₹8,900/yr',type:'Life'},
      {id:'POL-88298',name:'Demi Wilkinson',detail:'DriveSure Motor',status:'Expired',date:'Expired Oct 18',amount:'₹6,200/yr',type:'Vehicle'},
      {id:'POL-88294',name:'Candice Wu',detail:'Family Health Max',status:'Cancelled',date:'Closed Oct 15',amount:'₹18,400/yr',type:'Health'}
    ],
    premiums: [
      {id:'PRE-7021',name:'Olivia Rhye',detail:'POL-88301 · Instalment 3 of 12',status:'Due soon',date:'Oct 28, 2026',amount:'₹1,037',type:'Monthly'},
      {id:'PRE-7020',name:'Lana Steiner',detail:'POL-88297 · Instalment 6 of 12',status:'Paid',date:'Oct 21, 2026',amount:'₹742',type:'Monthly'},
      {id:'PRE-7018',name:'Demi Wilkinson',detail:'POL-88294 · Annual premium',status:'Overdue',date:'Oct 16, 2026',amount:'₹6,200',type:'Annual'},
      {id:'PRE-7017',name:'Candice Wu',detail:'POL-88290 · Instalment 2 of 12',status:'Paid',date:'Oct 15, 2026',amount:'₹1,534',type:'Monthly'}
    ],
    payments: [
      {id:'TXN-908841',name:'Olivia Rhye',detail:'UPI · •••• 4821',status:'Successful',date:'Oct 22, 2026',amount:'₹1,037',type:'Premium'},
      {id:'TXN-908840',name:'Lana Steiner',detail:'Credit card · •••• 1904',status:'Successful',date:'Oct 21, 2026',amount:'₹742',type:'Premium'},
      {id:'TXN-908839',name:'Demi Wilkinson',detail:'Net banking',status:'Failed',date:'Oct 20, 2026',amount:'₹6,200',type:'Premium'}
    ],
    claims: [
      {id:'CLM-51082',name:'Olivia Rhye',detail:'Hospitalisation · POL-88301',status:'Under review',date:'Oct 21, 2026',amount:'₹84,500',type:'Health'},
      {id:'CLM-51081',name:'Phoenix Baker',detail:'Vehicle damage · POL-88277',status:'Approved',date:'Oct 20, 2026',amount:'₹32,000',type:'Motor'},
      {id:'CLM-51079',name:'Demi Wilkinson',detail:'Hospitalisation · POL-88294',status:'Documents needed',date:'Oct 18, 2026',amount:'₹1,20,000',type:'Health'},
      {id:'CLM-51075',name:'Candice Wu',detail:'Life benefit · POL-88260',status:'Rejected',date:'Oct 15, 2026',amount:'₹5,00,000',type:'Life'}
    ],
    documents: [
      {id:'DOC-2401',name:'Olivia_Rhye_KYC.pdf',detail:'Olivia Rhye',status:'Verified',date:'Oct 22, 2026',amount:'1.2 MB',type:'KYC'},
      {id:'DOC-2400',name:'Hospital_Discharge.pdf',detail:'Claim CLM-51082',status:'Under review',date:'Oct 21, 2026',amount:'2.8 MB',type:'Claim'},
      {id:'DOC-2398',name:'Policy_POL-88301.pdf',detail:'Olivia Rhye',status:'Available',date:'Oct 20, 2026',amount:'640 KB',type:'Policy'}
    ],
    reports: [
      {id:'RPT-008',name:'Portfolio performance',detail:'Policies, premiums and claims',status:'Ready',date:'Today, 9:30 AM',amount:'PDF',type:'Operations'},
      {id:'RPT-007',name:'Agent productivity',detail:'Conversions and commission',status:'Ready',date:'Yesterday',amount:'XLSX',type:'Sales'},
      {id:'RPT-006',name:'Claims ageing report',detail:'Pending claim resolution',status:'Scheduled',date:'Oct 20, 2026',amount:'PDF',type:'Claims'}
    ],
    profile: [
      {id:'PERSONAL',name:'Full name',detail:'Alex Morgan',status:'Verified',date:'Updated recently',type:'Personal'},
      {id:'CONTACT',name:'Email address',detail:'alex.morgan@email.com',status:'Verified',date:'Updated Oct 12',type:'Contact'},
      {id:'ADDRESS',name:'Residential address',detail:'Navi Mumbai, Maharashtra',status:'Verified',date:'Updated Oct 12',type:'Address'},
      {id:'NOMINEE',name:'Nominee details',detail:'Taylor Morgan · Spouse',status:'Needs review',date:'Updated Sep 18',type:'Nominee'}
    ],
    support: [
      {id:'TKT-2018',name:'Premium payment confirmation',detail:'Payment query',status:'In progress',date:'Oct 21, 2026',type:'Billing'},
      {id:'TKT-2012',name:'Update nominee details',detail:'Profile support',status:'Resolved',date:'Oct 18, 2026',type:'Account'}
    ]
  };
  rows: Row[] = [];

  // Demo records are separated by sub-menu so sibling pages do not reuse
  // the same parent-section rows.
  private readonly submoduleData: Record<string, Row[]> = {
    'customer-list': [
      {id:'CUS-1048',name:'Olivia Rhye',detail:'olivia.rhye@email.com',status:'Verified',date:'Oct 21, 2026',type:'Individual'},
      {id:'CUS-1047',name:'Phoenix Baker',detail:'phoenix.baker@email.com',status:'In review',date:'Oct 20, 2026',type:'Individual'},
      {id:'CUS-1046',name:'Lana Steiner',detail:'lana.steiner@email.com',status:'Verified',date:'Oct 19, 2026',type:'Family'},
      {id:'CUS-1045',name:'Demi Wilkinson',detail:'demi.w@email.com',status:'Pending',date:'Oct 18, 2026',type:'Individual'},
      {id:'CUS-1044',name:'Candice Wu',detail:'candice.wu@email.com',status:'Verified',date:'Oct 17, 2026',type:'Family'}
    ],
    'kyc-verification': [
      {id:'KYC-3108',name:'Phoenix Baker',detail:'PAN and address proof review',status:'In review',date:'Oct 24, 2026',type:'Identity'},
      {id:'KYC-3107',name:'Demi Wilkinson',detail:'Address proof required',status:'Pending',date:'Oct 23, 2026',type:'Address'},
      {id:'KYC-3106',name:'Olivia Rhye',detail:'Identity documents verified',status:'Verified',date:'Oct 22, 2026',type:'Identity'}
    ],
    'agent-list': [
      {id:'AGT-0201',name:'Priya Sharma',detail:'priya.sharma@insureflow.in',status:'Active',date:'98% performance',amount:'₹1.24L',type:'48 customers'},
      {id:'AGT-0202',name:'Rahul Mehta',detail:'rahul.mehta@insureflow.in',status:'Active',date:'92% performance',amount:'₹98,400',type:'36 customers'},
      {id:'AGT-0203',name:'Neha Patil',detail:'neha.patil@insureflow.in',status:'On leave',date:'87% performance',amount:'₹76,200',type:'29 customers'}
    ],
    'commission-management': [
      {id:'COM-701',name:'Priya Sharma',detail:'October commission · 18 policies',status:'Pending',date:'Oct 24, 2026',amount:'₹24,800',type:'New business'},
      {id:'COM-702',name:'Rahul Mehta',detail:'October commission · 14 policies',status:'Approved',date:'Oct 23, 2026',amount:'₹18,600',type:'Renewal'},
      {id:'COM-703',name:'Neha Patil',detail:'September adjustment',status:'Paid',date:'Oct 20, 2026',amount:'₹12,400',type:'Adjustment'}
    ],
    'agent-performance': [
      {id:'PER-201',name:'Priya Sharma',detail:'Quote conversion: 72%',status:'On target',date:'October 2026',amount:'98%',type:'Sales'},
      {id:'PER-202',name:'Rahul Mehta',detail:'Quote conversion: 68%',status:'On target',date:'October 2026',amount:'92%',type:'Retention'},
      {id:'PER-203',name:'Neha Patil',detail:'Quote conversion: 51%',status:'Needs attention',date:'October 2026',amount:'87%',type:'Conversion'}
    ],
    'product-list': [
      {id:'PRD-001',name:'Health Secure Plus',detail:'Cashless network · 8,500+ hospitals',status:'Active',date:'From ₹8,499/yr',amount:'₹10L',type:'Health'},
      {id:'PRD-002',name:'Life Protect',detail:'Term life · Flexible cover',status:'Active',date:'From ₹6,200/yr',amount:'₹1Cr',type:'Life'},
      {id:'PRD-003',name:'DriveSure Motor',detail:'Cashless repairs · Roadside support',status:'Active',date:'From ₹4,100/yr',amount:'₹15L',type:'Vehicle'},
      {id:'PRD-004',name:'Family Health Max',detail:'Cashless + reimbursement',status:'Draft',date:'From ₹12,500/yr',amount:'₹25L',type:'Health'}
    ],
    'product-benefits': [
      {id:'BEN-101',name:'Cashless hospital network',detail:'Available with Health Secure Plus',status:'Active',date:'Updated Oct 20, 2026',type:'Health'},
      {id:'BEN-102',name:'Nominee protection',detail:'Life Protect policy benefit',status:'Active',date:'Updated Oct 18, 2026',type:'Life'},
      {id:'BEN-103',name:'Roadside assistance',detail:'DriveSure Motor add-on',status:'Active',date:'Updated Oct 16, 2026',type:'Vehicle'}
    ],
    'premium-schedule': [
      {id:'PRE-7021',name:'Olivia Rhye',detail:'POL-88301 · Instalment 3 of 12',status:'Due soon',date:'Oct 28, 2026',amount:'₹1,037',type:'Monthly'},
      {id:'PRE-7020',name:'Lana Steiner',detail:'POL-88297 · Instalment 6 of 12',status:'Paid',date:'Oct 21, 2026',amount:'₹742',type:'Monthly'},
      {id:'PRE-7018',name:'Demi Wilkinson',detail:'POL-88294 · Annual premium',status:'Overdue',date:'Oct 16, 2026',amount:'₹6,200',type:'Annual'},
      {id:'PRE-7017',name:'Candice Wu',detail:'POL-88290 · Instalment 2 of 12',status:'Paid',date:'Oct 15, 2026',amount:'₹1,534',type:'Monthly'}
    ],
    'paid-premiums': [
      {id:'PAY-8111',name:'Lana Steiner',detail:'POL-88297 · Instalment 6 of 12',status:'Paid',date:'Oct 21, 2026',amount:'₹742',type:'Monthly'},
      {id:'PAY-8110',name:'Candice Wu',detail:'POL-88290 · Instalment 2 of 12',status:'Paid',date:'Oct 15, 2026',amount:'₹1,534',type:'Monthly'},
      {id:'PAY-8109',name:'Olivia Rhye',detail:'POL-88291 · Annual premium',status:'Paid',date:'Oct 12, 2026',amount:'₹8,450',type:'Annual'}
    ],
    'due-premiums': [
      {id:'DUE-901',name:'Olivia Rhye',detail:'POL-88301 · Instalment 3 of 12',status:'Due soon',date:'Oct 28, 2026',amount:'₹1,037',type:'Monthly'},
      {id:'DUE-902',name:'Demi Wilkinson',detail:'POL-88294 · Annual premium',status:'Overdue',date:'Oct 16, 2026',amount:'₹6,200',type:'Annual'}
    ],
    'payment-history': [
      {id:'TXN-908841',name:'Olivia Rhye',detail:'UPI · •••• 4821',status:'Successful',date:'Oct 22, 2026',amount:'₹1,037',type:'Premium'},
      {id:'TXN-908840',name:'Lana Steiner',detail:'Credit card · •••• 1904',status:'Successful',date:'Oct 21, 2026',amount:'₹742',type:'Premium'},
      {id:'TXN-908839',name:'Demi Wilkinson',detail:'Net banking',status:'Failed',date:'Oct 20, 2026',amount:'₹6,200',type:'Premium'}
    ],
    'claim-list': [
      {id:'CLM-51082',name:'Olivia Rhye',detail:'Hospitalisation · POL-88301',status:'Under review',date:'Oct 21, 2026',amount:'₹84,500',type:'Health'},
      {id:'CLM-51081',name:'Phoenix Baker',detail:'Vehicle damage · POL-88277',status:'Approved',date:'Oct 20, 2026',amount:'₹32,000',type:'Motor'},
      {id:'CLM-51079',name:'Demi Wilkinson',detail:'Hospitalisation · POL-88294',status:'Documents needed',date:'Oct 18, 2026',amount:'₹1,20,000',type:'Health'},
      {id:'CLM-51075',name:'Candice Wu',detail:'Life benefit · POL-88260',status:'Rejected',date:'Oct 15, 2026',amount:'₹5,00,000',type:'Life'}
    ],
    'claim-decisions': [
      {id:'DEC-101',name:'Phoenix Baker',detail:'Vehicle damage claim · review decision',status:'Approved',date:'Oct 20, 2026',amount:'₹32,000',type:'Motor'},
      {id:'DEC-102',name:'Demi Wilkinson',detail:'Additional documents requested',status:'Documents needed',date:'Oct 18, 2026',amount:'₹1,20,000',type:'Health'}
    ],
    'claim-settlement': [
      {id:'SET-201',name:'Olivia Rhye',detail:'Hospitalisation claim · payment preparation',status:'Ready for settlement',date:'Oct 24, 2026',amount:'₹84,500',type:'Health'},
      {id:'SET-202',name:'Phoenix Baker',detail:'Vehicle claim · settlement completed',status:'Settled',date:'Oct 22, 2026',amount:'₹32,000',type:'Motor'}
    ],
    'policy-list': [
      {id:'POL-88301',name:'Olivia Rhye',detail:'Health Secure Plus',status:'Active',date:'Renews Oct 2027',amount:'₹12,450/yr',type:'Health'},
      {id:'POL-88300',name:'Lana Steiner',detail:'Life Protect',status:'Pending approval',date:'Created Oct 21',amount:'₹8,900/yr',type:'Life'},
      {id:'POL-88298',name:'Demi Wilkinson',detail:'DriveSure Motor',status:'Expired',date:'Expired Oct 18',amount:'₹6,200/yr',type:'Vehicle'}
    ],
    'policy-approvals': [
      {id:'APR-301',name:'Lana Steiner',detail:'Life Protect · awaiting approval',status:'Pending approval',date:'Oct 21, 2026',amount:'₹8,900/yr',type:'Life'},
      {id:'APR-302',name:'Olivia Rhye',detail:'Health Secure Plus · approved',status:'Approved',date:'Oct 20, 2026',amount:'₹12,450/yr',type:'Health'}
    ],
    'cancelled-policies': [
      {id:'CAN-401',name:'Demi Wilkinson',detail:'DriveSure Motor · cancellation processed',status:'Cancelled',date:'Oct 18, 2026',amount:'₹6,200/yr',type:'Vehicle'},
      {id:'CAN-402',name:'Candice Wu',detail:'Family Health Max · cancellation processed',status:'Cancelled',date:'Oct 15, 2026',amount:'₹18,400/yr',type:'Health'}
    ],
    'customer-documents': [
      {id:'DOC-2401',name:'Olivia_Rhye_KYC.pdf',detail:'Olivia Rhye',status:'Verified',date:'Oct 22, 2026',amount:'1.2 MB',type:'KYC'},
      {id:'DOC-2400',name:'Hospital_Discharge.pdf',detail:'Claim CLM-51082',status:'Under review',date:'Oct 21, 2026',amount:'2.8 MB',type:'Claim'}
    ],
    'claim-documents': [
      {id:'DOC-2501',name:'Hospital_Discharge.pdf',detail:'Claim CLM-51082 · Olivia Rhye',status:'Under review',date:'Oct 21, 2026',amount:'2.8 MB',type:'Claim'},
      {id:'DOC-2502',name:'Vehicle_Repair_Estimate.pdf',detail:'Claim CLM-51081 · Phoenix Baker',status:'Verified',date:'Oct 20, 2026',amount:'1.6 MB',type:'Claim'}
    ]
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.route.paramMap.subscribe(params => {
      console.log(
        'Workspace route changed:',
        params.get('section'),
        params.get('submodule')
      );

      this.role = params.get('role') || 'admin';
      this.section = params.get('section') || 'dashboard';
      this.submodule = params.get('submodule') || '';

      this.searchText = '';
      this.statusFilter = 'All statuses';

      const routeRows = this.submodule
        ? this.submoduleData[this.submodule] || this.defaultRowsForSubmodule(this.section, this.submodule)
        : undefined;
      this.rows = [
        ...(routeRows || this.data[this.section] || this.defaultRowsFor(this.section))
      ];

      this.cdr.markForCheck();
    });
  }
  defaultRowsFor(section: string): Row[] {
    const seed = this.data[section] || this.data['customers'];
    return seed.map((r, i) => ({...r, id: `${section.slice(0,3).toUpperCase()}-${String(1001+i)}`}));
  }

  private defaultRowsForSubmodule(section: string, submodule: string): Row[] {
    const seed = this.data[section] || this.data['customers'];
    const label = submodule.replace(/-/g, ' ');
    const prefix = submodule.split('-').map(part => part[0]).join('').toUpperCase().slice(0, 4);
    return seed.map((row, index) => ({
      ...row,
      id: `${prefix || 'SUB'}-${String(1001 + index)}`,
      detail: `${row.detail} · ${label}`,
      date: row.date || 'Oct 24, 2026'
    }));
  }
  get config(): PageConfig {
    const labels: Record<string,string> = {
      'customer-list':'Customer list','kyc-verification':'KYC verification','agent-list':'Agent list',
      'commission-management':'Commission management','agent-performance':'Agent performance',
      'product-list':'Product list','product-benefits':'Product benefits','quote-list':'Quote list',
      'policy-list':'Policy list','policy-approvals':'Policy approvals','cancelled-policies':'Cancelled policies',
      'premium-schedule':'Premium schedule','paid-premiums':'Paid premiums','due-premiums':'Due premiums',
      'payment-history':'Payment history','claim-list':'Claim list','claim-decisions':'Claim decisions',
      'claim-settlement':'Claim settlement','customer-documents':'Customer documents','claim-documents':'Claim documents',
      'policy-renewal':'Policy renewal','premium-history':'Premium history','raise-claim':'Raise claim',
      'claim-history':'Claim history','claim-status':'Claim status tracking','upload-kyc':'Upload KYC',
      'upload-claim-document':'Upload claim document','commission-history':'Commission history',
      'earning-summary':'Earning summary','personal-details':'Personal details','address-details':'Address details',
      'nominee-details':'Nominee details','kyc-documents':'KYC documents','health-insurance':'Health insurance',
      'life-insurance':'Life insurance','vehicle-insurance':'Vehicle insurance','my-quotes':'My quotes',
      'active-policies':'Active policies','expired-policies':'Expired policies','pay-premium':'Pay premium',
      'document-list':'All documents','upload-documents':'Upload documents','raise-ticket':'Raise support ticket',
      'contact-agent':'Contact agent'
    };
    const title = labels[this.submodule] || this.configs[this.section]?.title || 'Dashboard';
    const base = this.configs[this.section] || {title, subtitle:'Manage this area of the insurance workflow.', action:'Add record', columns:['Record','Details','Date','Status','Actions']};
    const actionBySub: Record<string,string> = {
      'customer-list':'Add customer','agent-list':'Add agent','product-list':'Add product','quote-list':'Generate quote',
      'my-quotes':'Generate quote','claim-list':'Add claim','raise-claim':'Raise claim','upload-kyc':'Upload KYC',
      'upload-claim-document':'Upload document','upload-documents':'Upload document','raise-ticket':'Raise ticket',
      'policy-renewal':'Renew policy','pay-premium':'Pay premium','customer-documents':'Upload document',
      'claim-documents':'Upload document','kyc-documents':'Upload KYC'
    };
    const submoduleOverrides: Record<string, Partial<PageConfig>> = {
      'customer-list': { subtitle: 'Manage customer profiles, KYC progress and account activity.', columns: ['Customer', 'Customer ID', 'Joined', 'KYC status', 'Actions'] },
      'kyc-verification': { subtitle: 'Review identity documents and track customer verification.', action: 'Review KYC', columns: ['Applicant', 'Verification ID', 'Document type', 'Submitted', 'KYC status'] },
      'agent-list': { subtitle: 'View agent contact details, customer portfolio and status.', columns: ['Agent', 'Agent ID', 'Customers', 'Performance', 'Status'] },
      'commission-management': { subtitle: 'Review commission calculations, approvals and payouts.', action: 'Process commission', columns: ['Agent', 'Commission ID', 'Commission type', 'Period', 'Amount / status'] },
      'agent-performance': { subtitle: 'Review conversion, retention and agent performance metrics.', action: 'Export performance', columns: ['Agent', 'Metric', 'Result', 'Period', 'Status'] },
      'product-list': { subtitle: 'Browse and manage insurance products and coverage.', columns: ['Product', 'Category', 'Coverage', 'Premium from', 'Status'] },
      'product-benefits': { subtitle: 'Review coverage features and benefits by insurance product.', action: 'Add benefit', columns: ['Benefit', 'Product', 'Category', 'Updated', 'Status'] },
      'premium-schedule': { subtitle: 'Monitor upcoming instalments and scheduled premium payments.', columns: ['Schedule', 'Policyholder', 'Due date', 'Amount', 'Status'] },
      'paid-premiums': { subtitle: 'Review premium instalments that have been paid successfully.', columns: ['Payment', 'Policyholder', 'Payment date', 'Amount', 'Status'] },
      'due-premiums': { subtitle: 'Track premiums that are due soon or overdue.', action: 'Send reminder', columns: ['Due item', 'Policyholder', 'Due date', 'Amount', 'Status'] },
      'payment-history': { subtitle: 'Review payment transactions and their outcomes.', columns: ['Transaction', 'Customer', 'Date', 'Amount', 'Status'] },
      'claim-list': { subtitle: 'Review submitted claims and their current status.', columns: ['Claim', 'Policyholder', 'Claim type', 'Submitted', 'Status'] },
      'claim-decisions': { subtitle: 'Review claims awaiting a decision or further documentation.', action: 'Review claim', columns: ['Decision ID', 'Claimant', 'Review details', 'Reviewed on', 'Decision'] },
      'claim-settlement': { subtitle: 'Track approved claims through settlement and payment.', action: 'Process settlement', columns: ['Settlement', 'Claimant', 'Claim details', 'Date', 'Settlement status'] },
      'policy-list': { subtitle: 'Browse policy records and their current lifecycle status.', columns: ['Policy', 'Policyholder', 'Product', 'Premium', 'Status'] },
      'policy-approvals': { subtitle: 'Review policies awaiting approval or already decided.', action: 'Review policy', columns: ['Approval', 'Policyholder', 'Product', 'Submitted', 'Decision'] },
      'cancelled-policies': { subtitle: 'Review policies that have been cancelled or closed.', columns: ['Cancellation', 'Policyholder', 'Product', 'Closed date', 'Status'] },
      'customer-documents': { subtitle: 'Manage customer identity and policy documents.', action: 'Upload document', columns: ['Document', 'Owner', 'Category', 'Uploaded', 'Status'] },
      'claim-documents': { subtitle: 'Review supporting documents submitted for claims.', action: 'Upload document', columns: ['Document', 'Claim / owner', 'Category', 'Uploaded', 'Status'] }
    };
    const override = submoduleOverrides[this.submodule] || {};
    return {...base, ...override, title, action: actionBySub[this.submodule] || override.action || base.action};
  }
  get isDashboard(): boolean { return this.section === 'dashboard' && !this.submodule; }
  get isPerformance(): boolean { return this.submodule === 'agent-performance'; }
  get isProductBenefits(): boolean { return this.submodule === 'product-benefits'; }
  get primaryActionLabel(): string { return this.config.action; }
  get canApproveReject(): boolean { return ['policy-approvals','claim-decisions','claim-list','claim-settlement'].includes(this.submodule) || this.section === 'claims' || this.section === 'policies'; }
  get isCustomer(): boolean { return this.role === 'customer'; }
  get isAgent(): boolean { return this.role === 'agent'; }
  get filteredRows(): Row[] {
    const q = this.searchText.toLowerCase().trim();
    return this.rows.filter(r => (!q || [r.id,r.name,r.detail,r.status,r.type].some(v => (v || '').toLowerCase().includes(q))) && (this.statusFilter === 'All statuses' || r.status === this.statusFilter));
  }
  get statuses(): string[] { return ['All statuses', ...new Set(this.rows.map(r => r.status))]; }
  get completedCount(): number { return this.rows.filter(r => ['Active','Verified','Paid','Successful','Approved','Ready','Available','Resolved','Converted'].includes(r.status)).length; }
  get attentionCount(): number { return this.rows.length - this.completedCount; }
  get initials(): string { return this.config.title.split(' ').slice(0,2).map(x => x[0]).join('').toUpperCase(); }
  openAdd(): void { this.formName=''; this.formDetail=''; this.formType='Health'; this.modalOpen=true; }
  closeModal(): void { this.modalOpen=false; this.detailOpen=false; }
  saveItem(): void {
    if (!this.formName.trim()) { this.toast='Please enter a name before saving.'; return; }
    const row: Row = { id: `${this.section.slice(0,3).toUpperCase()}-${Math.floor(1000+Math.random()*8999)}`, name:this.formName.trim(), detail:this.formDetail.trim() || 'New record', status:'Pending', date:'Today', type:this.formType, amount:'—' };
    this.rows = [row, ...this.rows]; this.modalOpen=false; this.toast='Record added to this demo workspace.'; setTimeout(()=>this.toast='',3200);
  }
  viewRow(row: Row): void { this.selectedRow=row; this.detailOpen=true; }
  doAction(row: Row, action: string): void {
    const statusMap: Record<string,string> = { Approve:'Approved', Reject:'Rejected', 'Mark paid':'Paid', Renew:'Renewal requested', 'Download':'Ready to download' };
    row.status=statusMap[action] || row.status;
    this.rows=[...this.rows];
    this.toast=`${action} action completed in demo mode.`; setTimeout(()=>this.toast='',3000);
  }

navigateToSection(section: string): void {
  this.router.navigate(['/', this.role, section]);
}

  exportDemo(): void { this.toast='This is a UI preview. Connect the module API to enable export and real transactions.'; setTimeout(()=>this.toast='',4000); }
  trackById(_: number, row: Row): string { return row.id; }
}
