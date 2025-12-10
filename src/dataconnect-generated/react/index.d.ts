import { AddNewUserData, AddNewUserVariables, GetCoursesData, UpdateGradeData, UpdateGradeVariables, GetAssignmentsForCourseData, GetAssignmentsForCourseVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAddNewUser(options?: useDataConnectMutationOptions<AddNewUserData, FirebaseError, AddNewUserVariables>): UseDataConnectMutationResult<AddNewUserData, AddNewUserVariables>;
export function useAddNewUser(dc: DataConnect, options?: useDataConnectMutationOptions<AddNewUserData, FirebaseError, AddNewUserVariables>): UseDataConnectMutationResult<AddNewUserData, AddNewUserVariables>;

export function useGetCourses(options?: useDataConnectQueryOptions<GetCoursesData>): UseDataConnectQueryResult<GetCoursesData, undefined>;
export function useGetCourses(dc: DataConnect, options?: useDataConnectQueryOptions<GetCoursesData>): UseDataConnectQueryResult<GetCoursesData, undefined>;

export function useUpdateGrade(options?: useDataConnectMutationOptions<UpdateGradeData, FirebaseError, UpdateGradeVariables>): UseDataConnectMutationResult<UpdateGradeData, UpdateGradeVariables>;
export function useUpdateGrade(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateGradeData, FirebaseError, UpdateGradeVariables>): UseDataConnectMutationResult<UpdateGradeData, UpdateGradeVariables>;

export function useGetAssignmentsForCourse(vars: GetAssignmentsForCourseVariables, options?: useDataConnectQueryOptions<GetAssignmentsForCourseData>): UseDataConnectQueryResult<GetAssignmentsForCourseData, GetAssignmentsForCourseVariables>;
export function useGetAssignmentsForCourse(dc: DataConnect, vars: GetAssignmentsForCourseVariables, options?: useDataConnectQueryOptions<GetAssignmentsForCourseData>): UseDataConnectQueryResult<GetAssignmentsForCourseData, GetAssignmentsForCourseVariables>;
