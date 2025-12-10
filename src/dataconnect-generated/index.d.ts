import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddNewUserData {
  user_insert: User_Key;
}

export interface AddNewUserVariables {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface Assignment_Key {
  id: UUIDString;
  __typename?: 'Assignment_Key';
}

export interface Attendance_Key {
  id: UUIDString;
  __typename?: 'Attendance_Key';
}

export interface Course_Key {
  id: UUIDString;
  __typename?: 'Course_Key';
}

export interface Enrollment_Key {
  id: UUIDString;
  __typename?: 'Enrollment_Key';
}

export interface GetAssignmentsForCourseData {
  assignments: ({
    id: UUIDString;
    title: string;
    description: string;
    dueDate: TimestampString;
    maxPoints: number;
  } & Assignment_Key)[];
}

export interface GetAssignmentsForCourseVariables {
  courseId: UUIDString;
}

export interface GetCoursesData {
  courses: ({
    id: UUIDString;
    name: string;
    code: string;
    description: string;
  } & Course_Key)[];
}

export interface Grade_Key {
  id: UUIDString;
  __typename?: 'Grade_Key';
}

export interface UpdateGradeData {
  grade_update?: Grade_Key | null;
}

export interface UpdateGradeVariables {
  id: UUIDString;
  score?: number | null;
  teacherComments?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface AddNewUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewUserVariables): MutationRef<AddNewUserData, AddNewUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddNewUserVariables): MutationRef<AddNewUserData, AddNewUserVariables>;
  operationName: string;
}
export const addNewUserRef: AddNewUserRef;

export function addNewUser(vars: AddNewUserVariables): MutationPromise<AddNewUserData, AddNewUserVariables>;
export function addNewUser(dc: DataConnect, vars: AddNewUserVariables): MutationPromise<AddNewUserData, AddNewUserVariables>;

interface GetCoursesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCoursesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCoursesData, undefined>;
  operationName: string;
}
export const getCoursesRef: GetCoursesRef;

export function getCourses(): QueryPromise<GetCoursesData, undefined>;
export function getCourses(dc: DataConnect): QueryPromise<GetCoursesData, undefined>;

interface UpdateGradeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGradeVariables): MutationRef<UpdateGradeData, UpdateGradeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateGradeVariables): MutationRef<UpdateGradeData, UpdateGradeVariables>;
  operationName: string;
}
export const updateGradeRef: UpdateGradeRef;

export function updateGrade(vars: UpdateGradeVariables): MutationPromise<UpdateGradeData, UpdateGradeVariables>;
export function updateGrade(dc: DataConnect, vars: UpdateGradeVariables): MutationPromise<UpdateGradeData, UpdateGradeVariables>;

interface GetAssignmentsForCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAssignmentsForCourseVariables): QueryRef<GetAssignmentsForCourseData, GetAssignmentsForCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAssignmentsForCourseVariables): QueryRef<GetAssignmentsForCourseData, GetAssignmentsForCourseVariables>;
  operationName: string;
}
export const getAssignmentsForCourseRef: GetAssignmentsForCourseRef;

export function getAssignmentsForCourse(vars: GetAssignmentsForCourseVariables): QueryPromise<GetAssignmentsForCourseData, GetAssignmentsForCourseVariables>;
export function getAssignmentsForCourse(dc: DataConnect, vars: GetAssignmentsForCourseVariables): QueryPromise<GetAssignmentsForCourseData, GetAssignmentsForCourseVariables>;

