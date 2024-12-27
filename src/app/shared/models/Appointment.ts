export class Appointment {
    id?: number; // Optional field
    patientName: string;
    doctorId: number;
    startTime: string; // Correspond à "start_time" du backend
    endTime: string;
    notes?: string; // Optional field
    status: string;
    address: string;
    email: string;
    phoneNumber: string;
    gender: 'Male' | 'Female';
  
    constructor(
      patientName: string,
      doctorId: number,
      startTime: string,
      endTime: string,
      status: string,
      address: string,
      email: string,
      phoneNumber: string,
      gender: 'Male' | 'Female',
      notes?: string,
      id?: number
    ) {
      this.patientName = patientName;
      this.doctorId = doctorId;
      this.startTime = startTime;
      this.endTime = endTime;
      this.status = status;
      this.address = address;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.gender = gender;
      this.notes = notes;
      this.id = id;
    }
  
    // Example method to format the appointment date
    getFormattedDate(): string {
      const start_date = new Date(this.startTime);
      const end_date = new Date(this.endTime);
  
      return `${start_date.toLocaleDateString()} ${start_date.toLocaleTimeString()} && ${end_date.toLocaleDateString()} ${end_date.toLocaleTimeString()}`;
    }
  }
  