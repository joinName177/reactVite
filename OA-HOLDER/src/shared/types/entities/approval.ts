export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'withdrawn'
export type ApprovalType = 'leave' | 'expense' | 'purchase' | 'overtime' | 'custom'

export interface IApproval {
  id: string
  title: string
  type: ApprovalType
  status: ApprovalStatus
  applicantId: string
  applicantName?: string
  currentApproverId?: string
  approverName?: string
  content: Record<string, unknown>
  remark?: string
  createdAt: string
  updatedAt: string
}

export interface IApprovalAction {
  approvalId: string
  action: 'approve' | 'reject'
  comment?: string
}
