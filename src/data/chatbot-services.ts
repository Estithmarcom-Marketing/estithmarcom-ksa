export interface ServiceNode {
  label: string
  children?: ServiceNode[]
}

export const chatbotServices: ServiceNode[] = [
  {
    label: "chatbot.srv.companyIncorporation",
    children: [
      { label: "chatbot.srv.serviceCompany" },
      { label: "chatbot.srv.industrialCompany" },
      { label: "chatbot.srv.realEstateCompany" },
      { label: "chatbot.srv.tradingCompany" },
      { label: "chatbot.srv.entrepreneurialCompany" },
      { label: "chatbot.srv.professionalCompany" },
      { label: "chatbot.srv.transportCompany" },
    ],
  },
  {
    label: "chatbot.srv.governmentServices",
    children: [
      {
        label: "chatbot.srv.qiwa",
        children: [
          { label: "chatbot.srv.qiwaEstablishmentData" },
          { label: "chatbot.srv.qiwaBranchManager" },
          { label: "chatbot.srv.qiwaRegisterEmployees" },
          { label: "chatbot.srv.qiwaEmployeeProfile" },
          { label: "chatbot.srv.qiwaUpdateSalaries" },
          { label: "chatbot.srv.qiwaSupervisors" },
          { label: "chatbot.srv.qiwaOwners" },
          { label: "chatbot.srv.qiwaGosiCertificate" },
        ],
      },
      {
        label: "chatbot.srv.moci",
        children: [
          { label: "chatbot.srv.mociIssueCr" },
          { label: "chatbot.srv.mociRenewCr" },
          { label: "chatbot.srv.mociAmendCr" },
          { label: "chatbot.srv.mociDeregisterSubCr" },
          { label: "chatbot.srv.mociDeregisterMainCr" },
          { label: "chatbot.srv.mociCrExtract" },
          { label: "chatbot.srv.mociAlignment" },
          { label: "chatbot.srv.mociAmendStandardAoa" },
          { label: "chatbot.srv.mociAmendPaperAoaInvestment" },
          { label: "chatbot.srv.mociAmendPaperAoaSaudi" },
        ],
      },
      {
        label: "chatbot.srv.balady",
        children: [
          { label: "chatbot.srv.baladyIssueLicense" },
          { label: "chatbot.srv.baladyRenewLicense" },
          { label: "chatbot.srv.baladyAmendLicense" },
          { label: "chatbot.srv.baladyCancelLicense" },
          { label: "chatbot.srv.baladyUpdateSalaries" },
          { label: "chatbot.srv.baladyPrintQr" },
        ],
      },
      {
        label: "chatbot.srv.muqeem",
        children: [
          { label: "chatbot.srv.muqeemIssueIqama" },
          { label: "chatbot.srv.muqeemRenewIqama" },
          { label: "chatbot.srv.muqeemModifyProfession" },
          { label: "chatbot.srv.muqeemPrintIqama" },
          { label: "chatbot.srv.muqeemExitReentryVisa" },
          { label: "chatbot.srv.muqeemFinalExitVisa" },
          { label: "chatbot.srv.muqeemAbscondedWorker" },
          { label: "chatbot.srv.muqeemDocumentDelivery" },
          { label: "chatbot.srv.muqeemRenewAbsher" },
          { label: "chatbot.srv.muqeemReport" },
          { label: "chatbot.srv.muqeemUpdatePassport" },
        ],
      },
      {
        label: "chatbot.srv.zatca",
        children: [
          { label: "chatbot.srv.zatcaVatRegister" },
          { label: "chatbot.srv.zatcaVatReturn" },
          { label: "chatbot.srv.zatcaZakatEstimateNoCpa" },
          { label: "chatbot.srv.zatcaZakatEstimateCpa" },
          { label: "chatbot.srv.zatcaZakatCertificate" },
          { label: "chatbot.srv.zatcaVatCertificate" },
          { label: "chatbot.srv.zatcaUpdateTin" },
          { label: "chatbot.srv.zatcaZakatIncomeRegister" },
        ],
      },
      {
        label: "chatbot.srv.mudad",
        children: [
          { label: "chatbot.srv.mudadRegister" },
          { label: "chatbot.srv.mudadMonthlyPayroll" },
          { label: "chatbot.srv.mudadEmployeeData" },
          { label: "chatbot.srv.mudadWageViolations" },
        ],
      },
      {
        label: "chatbot.srv.nationalAddress",
        children: [
          { label: "chatbot.srv.nationalAddressRegister" },
          { label: "chatbot.srv.nationalAddressPrint" },
          { label: "chatbot.srv.nationalAddressAmend" },
        ],
      },
      {
        label: "chatbot.srv.chamberOfCommerce",
        children: [
          { label: "chatbot.srv.chamberVisaAttestation" },
          { label: "chatbot.srv.chamberDocAttestation" },
          { label: "chatbot.srv.chamberReExportCert" },
          { label: "chatbot.srv.chamberContestPermit" },
          { label: "chatbot.srv.chamberDelegates" },
          { label: "chatbot.srv.chamberEstablishmentUpdate" },
        ],
      },
    ],
  },
  {
    label: "chatbot.srv.premiumResidency",
    children: [
      { label: "chatbot.srv.premiumBusinessInvestor" },
      { label: "chatbot.srv.premiumRealEstateOwner" },
      { label: "chatbot.srv.premiumEntrepreneur" },
      { label: "chatbot.srv.premiumExceptionalCompetence" },
      { label: "chatbot.srv.premiumTalent" },
      { label: "chatbot.srv.premiumLimitedDuration" },
      { label: "chatbot.srv.premiumUnlimitedDuration" },
    ],
  },
]
