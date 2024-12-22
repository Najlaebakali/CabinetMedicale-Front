export class Appointment {
    id?: number; // Optional field
    patientName: string;
    doctorId: number;
    appointmentDate: string;
    notes?: string; // Optional field
    isCancelled: boolean;
    address: string;
    email: string;
    phoneNumber: string;
    gender: 'Male' | 'Female';
  
    constructor(
      patientName: string,
      doctorId: number,
      appointmentDate: string,
      isCancelled: boolean,
      address: string,
      email: string,
      phoneNumber: string,
      gender: 'Male' | 'Female',
      notes?: string,
      id?: number
    ) {
      this.patientName = patientName;
      this.doctorId = doctorId;
      this.appointmentDate = appointmentDate;
      this.isCancelled = isCancelled;
      this.address = address;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.gender = gender;
      this.notes = notes;
      this.id = id;
    }
  
    // Example method to format the appointment date
    getFormattedDate(): string {
      const date = new Date(this.appointmentDate);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
  }
  