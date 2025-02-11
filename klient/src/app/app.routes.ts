import { Routes } from '@angular/router';
import { ListofmemberComponent } from './members/listofmember/listofmember.component';
import { MemberdetailComponent } from './members/memberdetail/memberdetail.component';
import { MessagesComponent } from './messages/messages.component';
import { authorisationGuard } from './guards/autoryzacja.guard';
import { MembereditComponent } from './members/memberedit/memberedit.component';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';
import { adminGuard } from './guards/admin.guard';
import { MainComponent } from './main/main.component';
import { memberdetaleResolver } from './_solutions/memberdetale.resolver';
import { AdminPanelComponent } from './administrator/admin-panel/admin-panel.component';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authorisationGuard],
        children: [
            {path: 'members', component: ListofmemberComponent, canActivate: [authorisationGuard]},
            {path: 'members/:username', component: MemberdetailComponent, resolve: {member: memberdetaleResolver}},
            {path: 'znajomy/edit', component: MembereditComponent, canDeactivate: [unsavedChangesGuard]},
            {path: 'wiadomosci', component: MessagesComponent},
            {path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard]}
        ]
    },
    {path: '**', component: MainComponent, pathMatch: 'full'},
];
