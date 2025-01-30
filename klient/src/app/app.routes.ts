import { Routes } from '@angular/router';
import { GlownaComponent } from './glowna/glowna.component';
import { ListofmemberComponent } from './members/listofmember/listofmember.component';
import { MemberdetailComponent } from './members/memberdetail/memberdetail.component';
import { ListyComponent } from './listy/listy.component';
import { WiadomosciComponent } from './wiadomosci/wiadomosci.component';
import { autoryzacjaGuard } from './guards/autoryzacja.guard';
import { MembereditComponent } from './members/memberedit/memberedit.component';
import { niezapisaneZmianyGuard } from './guards/niezapisane-zmiany.guard';
import { memberdetaleResolver } from './_rozwiazania/memberdetale.resolver';
import { AdminPanelComponent } from './Administrator/admin-panel/admin-panel.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    {path: '', component: GlownaComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [autoryzacjaGuard],
        children: [
            {path: 'members', component: ListofmemberComponent, canActivate: [autoryzacjaGuard]},
            {path: 'members/:username', component: MemberdetailComponent, resolve: {member: memberdetaleResolver}},
            {path: 'znajomy/edit', component: MembereditComponent, canDeactivate: [niezapisaneZmianyGuard]},
            {path: 'listy', component: ListyComponent},
            {path: 'wiadomosci', component: WiadomosciComponent},
            {path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard]}
        ]
    },
    {path: '**', component: GlownaComponent, pathMatch: 'full'},
];
