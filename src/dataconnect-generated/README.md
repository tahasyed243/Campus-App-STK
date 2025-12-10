# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCourses*](#getcourses)
  - [*GetAssignmentsForCourse*](#getassignmentsforcourse)
- [**Mutations**](#mutations)
  - [*AddNewUser*](#addnewuser)
  - [*UpdateGrade*](#updategrade)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCourses
You can execute the `GetCourses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCourses(): QueryPromise<GetCoursesData, undefined>;

interface GetCoursesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCoursesData, undefined>;
}
export const getCoursesRef: GetCoursesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCourses(dc: DataConnect): QueryPromise<GetCoursesData, undefined>;

interface GetCoursesRef {
  ...
  (dc: DataConnect): QueryRef<GetCoursesData, undefined>;
}
export const getCoursesRef: GetCoursesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCoursesRef:
```typescript
const name = getCoursesRef.operationName;
console.log(name);
```

### Variables
The `GetCourses` query has no variables.
### Return Type
Recall that executing the `GetCourses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCoursesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCoursesData {
  courses: ({
    id: UUIDString;
    name: string;
    code: string;
    description: string;
  } & Course_Key)[];
}
```
### Using `GetCourses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCourses } from '@dataconnect/generated';


// Call the `getCourses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCourses();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCourses(dataConnect);

console.log(data.courses);

// Or, you can use the `Promise` API.
getCourses().then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

### Using `GetCourses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCoursesRef } from '@dataconnect/generated';


// Call the `getCoursesRef()` function to get a reference to the query.
const ref = getCoursesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCoursesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.courses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.courses);
});
```

## GetAssignmentsForCourse
You can execute the `GetAssignmentsForCourse` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAssignmentsForCourse(vars: GetAssignmentsForCourseVariables): QueryPromise<GetAssignmentsForCourseData, GetAssignmentsForCourseVariables>;

interface GetAssignmentsForCourseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAssignmentsForCourseVariables): QueryRef<GetAssignmentsForCourseData, GetAssignmentsForCourseVariables>;
}
export const getAssignmentsForCourseRef: GetAssignmentsForCourseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAssignmentsForCourse(dc: DataConnect, vars: GetAssignmentsForCourseVariables): QueryPromise<GetAssignmentsForCourseData, GetAssignmentsForCourseVariables>;

interface GetAssignmentsForCourseRef {
  ...
  (dc: DataConnect, vars: GetAssignmentsForCourseVariables): QueryRef<GetAssignmentsForCourseData, GetAssignmentsForCourseVariables>;
}
export const getAssignmentsForCourseRef: GetAssignmentsForCourseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAssignmentsForCourseRef:
```typescript
const name = getAssignmentsForCourseRef.operationName;
console.log(name);
```

### Variables
The `GetAssignmentsForCourse` query requires an argument of type `GetAssignmentsForCourseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAssignmentsForCourseVariables {
  courseId: UUIDString;
}
```
### Return Type
Recall that executing the `GetAssignmentsForCourse` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAssignmentsForCourseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAssignmentsForCourseData {
  assignments: ({
    id: UUIDString;
    title: string;
    description: string;
    dueDate: TimestampString;
    maxPoints: number;
  } & Assignment_Key)[];
}
```
### Using `GetAssignmentsForCourse`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAssignmentsForCourse, GetAssignmentsForCourseVariables } from '@dataconnect/generated';

// The `GetAssignmentsForCourse` query requires an argument of type `GetAssignmentsForCourseVariables`:
const getAssignmentsForCourseVars: GetAssignmentsForCourseVariables = {
  courseId: ..., 
};

// Call the `getAssignmentsForCourse()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAssignmentsForCourse(getAssignmentsForCourseVars);
// Variables can be defined inline as well.
const { data } = await getAssignmentsForCourse({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAssignmentsForCourse(dataConnect, getAssignmentsForCourseVars);

console.log(data.assignments);

// Or, you can use the `Promise` API.
getAssignmentsForCourse(getAssignmentsForCourseVars).then((response) => {
  const data = response.data;
  console.log(data.assignments);
});
```

### Using `GetAssignmentsForCourse`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAssignmentsForCourseRef, GetAssignmentsForCourseVariables } from '@dataconnect/generated';

// The `GetAssignmentsForCourse` query requires an argument of type `GetAssignmentsForCourseVariables`:
const getAssignmentsForCourseVars: GetAssignmentsForCourseVariables = {
  courseId: ..., 
};

// Call the `getAssignmentsForCourseRef()` function to get a reference to the query.
const ref = getAssignmentsForCourseRef(getAssignmentsForCourseVars);
// Variables can be defined inline as well.
const ref = getAssignmentsForCourseRef({ courseId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAssignmentsForCourseRef(dataConnect, getAssignmentsForCourseVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.assignments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.assignments);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddNewUser
You can execute the `AddNewUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addNewUser(vars: AddNewUserVariables): MutationPromise<AddNewUserData, AddNewUserVariables>;

interface AddNewUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewUserVariables): MutationRef<AddNewUserData, AddNewUserVariables>;
}
export const addNewUserRef: AddNewUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addNewUser(dc: DataConnect, vars: AddNewUserVariables): MutationPromise<AddNewUserData, AddNewUserVariables>;

interface AddNewUserRef {
  ...
  (dc: DataConnect, vars: AddNewUserVariables): MutationRef<AddNewUserData, AddNewUserVariables>;
}
export const addNewUserRef: AddNewUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addNewUserRef:
```typescript
const name = addNewUserRef.operationName;
console.log(name);
```

### Variables
The `AddNewUser` mutation requires an argument of type `AddNewUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddNewUserVariables {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
```
### Return Type
Recall that executing the `AddNewUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddNewUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddNewUserData {
  user_insert: User_Key;
}
```
### Using `AddNewUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addNewUser, AddNewUserVariables } from '@dataconnect/generated';

// The `AddNewUser` mutation requires an argument of type `AddNewUserVariables`:
const addNewUserVars: AddNewUserVariables = {
  firstName: ..., 
  lastName: ..., 
  email: ..., 
  role: ..., 
};

// Call the `addNewUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addNewUser(addNewUserVars);
// Variables can be defined inline as well.
const { data } = await addNewUser({ firstName: ..., lastName: ..., email: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addNewUser(dataConnect, addNewUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
addNewUser(addNewUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `AddNewUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addNewUserRef, AddNewUserVariables } from '@dataconnect/generated';

// The `AddNewUser` mutation requires an argument of type `AddNewUserVariables`:
const addNewUserVars: AddNewUserVariables = {
  firstName: ..., 
  lastName: ..., 
  email: ..., 
  role: ..., 
};

// Call the `addNewUserRef()` function to get a reference to the mutation.
const ref = addNewUserRef(addNewUserVars);
// Variables can be defined inline as well.
const ref = addNewUserRef({ firstName: ..., lastName: ..., email: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addNewUserRef(dataConnect, addNewUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateGrade
You can execute the `UpdateGrade` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateGrade(vars: UpdateGradeVariables): MutationPromise<UpdateGradeData, UpdateGradeVariables>;

interface UpdateGradeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGradeVariables): MutationRef<UpdateGradeData, UpdateGradeVariables>;
}
export const updateGradeRef: UpdateGradeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateGrade(dc: DataConnect, vars: UpdateGradeVariables): MutationPromise<UpdateGradeData, UpdateGradeVariables>;

interface UpdateGradeRef {
  ...
  (dc: DataConnect, vars: UpdateGradeVariables): MutationRef<UpdateGradeData, UpdateGradeVariables>;
}
export const updateGradeRef: UpdateGradeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateGradeRef:
```typescript
const name = updateGradeRef.operationName;
console.log(name);
```

### Variables
The `UpdateGrade` mutation requires an argument of type `UpdateGradeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateGradeVariables {
  id: UUIDString;
  score?: number | null;
  teacherComments?: string | null;
}
```
### Return Type
Recall that executing the `UpdateGrade` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateGradeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateGradeData {
  grade_update?: Grade_Key | null;
}
```
### Using `UpdateGrade`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateGrade, UpdateGradeVariables } from '@dataconnect/generated';

// The `UpdateGrade` mutation requires an argument of type `UpdateGradeVariables`:
const updateGradeVars: UpdateGradeVariables = {
  id: ..., 
  score: ..., // optional
  teacherComments: ..., // optional
};

// Call the `updateGrade()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateGrade(updateGradeVars);
// Variables can be defined inline as well.
const { data } = await updateGrade({ id: ..., score: ..., teacherComments: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateGrade(dataConnect, updateGradeVars);

console.log(data.grade_update);

// Or, you can use the `Promise` API.
updateGrade(updateGradeVars).then((response) => {
  const data = response.data;
  console.log(data.grade_update);
});
```

### Using `UpdateGrade`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateGradeRef, UpdateGradeVariables } from '@dataconnect/generated';

// The `UpdateGrade` mutation requires an argument of type `UpdateGradeVariables`:
const updateGradeVars: UpdateGradeVariables = {
  id: ..., 
  score: ..., // optional
  teacherComments: ..., // optional
};

// Call the `updateGradeRef()` function to get a reference to the mutation.
const ref = updateGradeRef(updateGradeVars);
// Variables can be defined inline as well.
const ref = updateGradeRef({ id: ..., score: ..., teacherComments: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateGradeRef(dataConnect, updateGradeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.grade_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.grade_update);
});
```

