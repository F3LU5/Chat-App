using System;
using API.Rozszerzenia;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class PresenceHub(PresenceTracker tracker) : Hub
{
    public override async Task OnConnectedAsync()
    {
        if (Context.User == null) throw new HubException("Nie można pobrać poprawnego użytkownika");

        await tracker.UserConnected(Context.User.GetUsername(), Context.ConnectionId);
        await Clients.Others.SendAsync("UserIsOnline", Context.User?.GetUsername());
        

        var currentUsers = await tracker.GetOnlineUsers();
        await Clients.All.SendAsync("GetOnlineUsers", currentUsers);
        Console.WriteLine($"Client connected: {Context.ConnectionId}");
        var token = Context.GetHttpContext()?.Request.Query["access_token"];
        Console.WriteLine($"Client connected: {Context.ConnectionId}, Token: {token}");
        Console.WriteLine($"Token: {token}");
        
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
         if (Context.User == null) throw new HubException("Nie można pobrać poprawnego użytkownika");

        await tracker.UserDisconnected(Context.User.GetUsername(), Context.ConnectionId);
        await Clients.Others.SendAsync("UserIsOffline", Context.User?.GetUsername());

        var currentUsers = await tracker.GetOnlineUsers();
        await Clients.All.SendAsync("GetOnlineUsers", currentUsers);

        Console.WriteLine($"Client disconnected: {Context.ConnectionId}");
        await base.OnDisconnectedAsync(exception);
    }
}
