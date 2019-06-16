using Newtonsoft.Json;
using System;
using System.IO;
using TradeX.DataAccess.Entities;

namespace TradeX.DataAccess
{
    public static class DbInitializer
    {
        private static readonly string[] defaultRoles = new string[] { "Admin", "User" };

        private const string defaultAdminEmail = "admin@tradex.com";
        private const string defaultAdminPassword = "123456";

        public static void Initialize(TradeXContext context)
        {
            SeedDataFromJson(context);

            //SeedRoles(context);

            //SeedAdminUser(context);
        }

        private static void SeedDataFromJson(TradeXContext context)
        {
            //var jsonString = File.ReadAllText("sport-events.json");

            //JsonConverter.DeserializeObject<Event>(jsonString);
        }

        //private static void SeedRoles(TradeXContext context)
        //{
        //    foreach (var role in defaultRoles)
        //    {
        //        var roleExists = context.Roles.Any(r => r.Name.Equals(role));

        //        if (!roleExists)
        //        {
        //            context.Roles.Add(new Role { Name = role });
        //        }
        //    }

        //    context.SaveChanges();
        //}

        //private static void SeedAdminUser(TradeXContext context)
        //{
        //    var adminUser = context.Users.FirstOrDefault(u => u.Email.Equals(defaultAdminEmail));

        //    if (adminUser != null)
        //    {
        //        return;
        //    }

        //    adminUser = new User()
        //    {
        //        Email = defaultAdminEmail,
        //        PasswordHash = Crypto.HashPassword(defaultAdminPassword),
        //        FirstName = "Iliyan",
        //        LastName = "Ivanov",
        //    };

        //    context.Users.Add(adminUser);

        //    var adminRoleId = context.Roles.FirstOrDefault(u => u.Name.Equals("Admin")).Id;

        //    context.UserRoles.Add(new UserRole()
        //    {
        //        User = adminUser,
        //        RoleId = adminRoleId,
        //    });

        //    context.SaveChanges();
        //}
    }
}
