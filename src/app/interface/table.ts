export interface TableItem {
      orderNumber: string;
      name: string;
      bin: number;
      company: string;
      contractNumber: string;
      analysis: string;
      dateRegistration: Date;
      dateFinish: Date;
      laboratory: string;
      status: string;
}

export interface ProbeItem {
      fields: string;
      wellNumber: number;
      typeOfSampler: string;
      perforationInterval: number;
      secondPerforationInterval: number;
      depthOfSelection: number;
      temperature: string;
      pressure: string;
      dateOfSelection: Date;
      dateOfReceipt: Date;
      id: number;
}
