import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, DashboardCharts, DashboardSummary, PolicyReport, PremiumReport, 
  ClaimReport, UnderwritingReport, AgentReport, FinancialReport } from '../models/report.models';



export interface CustomerReport {
  customerId: number;
  customerName: string;
  city: string;
  state: string;
  status: string;
  product: string;
  agent: string;
  branch: string;
  date: string;
}


@Injectable({ providedIn: 'root' })
export class ReportsDashboardService {
  // Local development URL. For AWS, replace this with the deployed reporting API URL.
  private readonly baseUrl = 'http://3.108.54.181:8015/api/v1';

  constructor(private readonly http: HttpClient) {}

  getDashboardSummary(): Observable<ApiResponse<DashboardSummary>> {
    return this.http.get<ApiResponse<DashboardSummary>>(`${this.baseUrl}/dashboard/summary`);
  }

  getDashboardCharts(): Observable<ApiResponse<DashboardCharts>> {
    return this.http.get<ApiResponse<DashboardCharts>>(`${this.baseUrl}/dashboard/charts`);
  }

  getPolicies(): Observable<ApiResponse<PolicyReport[]>> {
    return this.http.get<ApiResponse<PolicyReport[]>>(`${this.baseUrl}/reports/policies`);
  }

  
getCustomers(): Observable<ApiResponse<CustomerReport[]>> {
  return this.http.get<ApiResponse<CustomerReport[]>>(
    `${this.baseUrl}/reports/customers`
  );
}
getPremiums(): Observable<ApiResponse<PremiumReport[]>> {
  return this.http.get<ApiResponse<PremiumReport[]>>(
    `${this.baseUrl}/reports/premiums`
  );
}
getClaims(): Observable<ApiResponse<ClaimReport[]>> {
  return this.http.get<ApiResponse<ClaimReport[]>>(
    `${this.baseUrl}/reports/claims`
  );
}
getUnderwriting(): Observable<ApiResponse<UnderwritingReport[]>> {
  return this.http.get<ApiResponse<UnderwritingReport[]>>(
    `${this.baseUrl}/reports/underwriting`
  );
}

getAgents(): Observable<ApiResponse<AgentReport[]>> {
  return this.http.get<ApiResponse<AgentReport[]>>(
    `${this.baseUrl}/reports/agents`
  );
}
getFinancial(): Observable<ApiResponse<FinancialReport[]>> {
  return this.http.get<ApiResponse<FinancialReport[]>>(
    `${this.baseUrl}/reports/financial`
  );
}
  exportReport(format: 'csv' | 'excel' | 'pdf', category = 'policies'): Observable<Blob> {
    const params = new HttpParams().set('category', category);
    return this.http.get(`${this.baseUrl}/reports/export/${format}`, {
      params,
      responseType: 'blob'
    });
  }
}
