import { configureStore } from '@reduxjs/toolkit'
import { AuthAPI } from '../services/api/AuthAPI'
import { ProfileAPI } from '../services/api/ProfileAPI'
import { ProjetAPI } from '../services/api/ProjetAPI'
import { AnnoncesAPI } from '../services/api/AnnoncesAPI'
import { NewsAPI } from '../services/api/NewsAPI'
import { ModulesAPI } from '../services/api/ModulesAPI'
import { QuestionsAPI } from '../services/api/QuestionsAPI'
import { PartnersAPI } from '../services/api/PartnersAPI'
import { CoursAPI } from '../services/api/CoursAPI'
import { UsersAPI } from './api/UsersAPI'
import { GroupsAPI } from './api/GroupsAPI'
import { ResourcesAPI } from './api/ResourcesAPI'
import { PagesAPI } from './api/PagesAPI'
import { TeamMembersAPI } from './api/TeamMembersAPI'
import { EventsAPI } from './api/EventsAPI'
import { MessagesAPI } from './api/MessagesAPI'
import { NotificationAPI } from './api/NotificationsAPI'
import { EvaluationAPI } from './api/EvaluationAPI'
import { EvaluationPeriodeAPI } from './api/EvaluationPeriodeAPI'
import { HomePageAPI } from './api/HomePageAPI'
import { DashboardAPI } from './api/DashboardAPI'


export const store = configureStore({
  reducer: {
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [ProfileAPI.reducerPath]: ProfileAPI.reducer,
    [ProjetAPI.reducerPath]: ProjetAPI.reducer,
    [AnnoncesAPI.reducerPath]: AnnoncesAPI.reducer,
    [ModulesAPI.reducerPath]: ModulesAPI.reducer,
    [QuestionsAPI.reducerPath]: QuestionsAPI.reducer,
    [NewsAPI.reducerPath]: NewsAPI.reducer,
    [PartnersAPI.reducerPath]: PartnersAPI.reducer,
    [CoursAPI.reducerPath]: CoursAPI.reducer,
    [UsersAPI.reducerPath]: UsersAPI.reducer,
    [GroupsAPI.reducerPath]: GroupsAPI.reducer,
    [ResourcesAPI.reducerPath]: ResourcesAPI.reducer,
    [PagesAPI.reducerPath]: PagesAPI.reducer,
    [TeamMembersAPI.reducerPath]: TeamMembersAPI.reducer,
    [EventsAPI.reducerPath]: EventsAPI.reducer,
    [MessagesAPI.reducerPath]: MessagesAPI.reducer,
    [NotificationAPI.reducerPath]: NotificationAPI.reducer,
    [EvaluationAPI.reducerPath]: EvaluationAPI.reducer,
    [EvaluationPeriodeAPI.reducerPath]: EvaluationPeriodeAPI.reducer,
    [HomePageAPI.reducerPath]: HomePageAPI.reducer,
    [DashboardAPI.reducerPath]: DashboardAPI.reducer,
 

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(AuthAPI.middleware)
      .concat(ProfileAPI.middleware)
      .concat(ProjetAPI.middleware)
      .concat(AnnoncesAPI.middleware)
      .concat(NewsAPI.middleware)
      .concat(ModulesAPI.middleware)
      .concat(QuestionsAPI.middleware)
      .concat(PartnersAPI.middleware)
      .concat(CoursAPI.middleware)
      .concat(UsersAPI.middleware)
      .concat(GroupsAPI.middleware)
      .concat(ResourcesAPI.middleware)
      .concat(PagesAPI.middleware)
      .concat(TeamMembersAPI.middleware)
      .concat(EventsAPI.middleware)
      .concat(MessagesAPI.middleware)
      .concat(NotificationAPI.middleware)
      .concat(EvaluationAPI.middleware)
      .concat(EvaluationPeriodeAPI.middleware)
      .concat(HomePageAPI.middleware)
      .concat(DashboardAPI.middleware)

})
