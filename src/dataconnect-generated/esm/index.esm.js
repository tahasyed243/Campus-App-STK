import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'campus-app',
  location: 'us-east4'
};

export const addNewUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewUser', inputVars);
}
addNewUserRef.operationName = 'AddNewUser';

export function addNewUser(dcOrVars, vars) {
  return executeMutation(addNewUserRef(dcOrVars, vars));
}

export const getCoursesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourses');
}
getCoursesRef.operationName = 'GetCourses';

export function getCourses(dc) {
  return executeQuery(getCoursesRef(dc));
}

export const updateGradeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateGrade', inputVars);
}
updateGradeRef.operationName = 'UpdateGrade';

export function updateGrade(dcOrVars, vars) {
  return executeMutation(updateGradeRef(dcOrVars, vars));
}

export const getAssignmentsForCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAssignmentsForCourse', inputVars);
}
getAssignmentsForCourseRef.operationName = 'GetAssignmentsForCourse';

export function getAssignmentsForCourse(dcOrVars, vars) {
  return executeQuery(getAssignmentsForCourseRef(dcOrVars, vars));
}

