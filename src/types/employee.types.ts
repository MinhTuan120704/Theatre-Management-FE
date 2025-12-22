// Employee Types
export interface Employee {
  employeeId: number;
  cinemaId: number | null;
  position: string;
  shift: string;
}

export interface EmployeeCreateDto {
  cinemaId: number;
  position: string;
  shift: string;
}

export interface EmployeeUpdateDto {
  cinemaId?: number;
  position?: string;
  shift?: string;
}

export interface EmployeeResponseDto {
  employeeId: number;
  cinemaId: number;
  position: string;
  shift: string;
}
