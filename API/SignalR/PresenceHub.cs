using System;
using API.Extensions;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class PresenceHub(PresenceTracker tracker) : Hub
{
    public override async Task OnConnectedAsync()
    {
        if (Context.User == null) throw new HubException("Nie można pobrać poprawnego użytkownika");

        var isOnline = await tracker.UserConnected(Context.User.GetUsername(), Context.ConnectionId);
        if(isOnline) await Clients.Others.SendAsync("UserIsOnline", Context.User?.GetUsername());

        

        var currentUsers = await tracker.GetOnlineUsers();
        await Clients.Caller.SendAsync("GetOnlineUsers", currentUsers);
        var token = Context.GetHttpContext()?.Request.Query["access_token"];
        
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
         if (Context.User == null) throw new HubException("Nie można pobrać poprawnego użytkownika");

        var isOffline = await tracker.UserDisconnected(Context.User.GetUsername(), Context.ConnectionId);
        if(isOffline) await Clients.Others.SendAsync("UserIsOffline", Context.User?.GetUsername());



        await base.OnDisconnectedAsync(exception);
    }
}
