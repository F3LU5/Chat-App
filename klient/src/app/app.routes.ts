import { Routes } from '@angular/router';
import { GlownaComponent } from './glowna/glowna.component';
import { ListofmemberComponent } from './members/listofmember/listofmember.component';
import { MemberdetailComponent } from './members/memberdetail/memberdetail.component';
import { ListyComponent } from './listy/listy.component';
import { WiadomosciComponent } from './wiadomosci/wiadomosci.component';
import { autoryzacjaGuard } from './guards/autoryzacja.guard';
import { MembereditComponent } from './members/memberedit/memberedit.component';
import { niezapisaneZmianyGuard } from './guards/niezapisane-zmiany.guard';

export const routes: Routes = [
    {path: '', component: GlownaComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [autoryzacjaGuard],
        children: [
            {path: 'members', component: ListofmemberComponent, canActivate: [autoryzacjaGuard]},
            {path: 'znajomi/:username', component: MemberdetailComponent},
            {path: 'znajomy/edit', component: MembereditComponent, canDeactivate: [niezapisaneZmianyGuard]},
            {path: 'listy', component: ListyComponent},
            {path: 'wiadomosci', component: WiadomosciComponent},
        ]
    },
    {path: '**', component: GlownaComponent, pathMatch: 'full'},
];
