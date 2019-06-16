using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Linq;
using System.Reflection;
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
            //context.Database.EnsureDeleted();
            //context.Database.Migrate();
            //SeedSportEvents(context);

            //SeedRoles(context);
            //SeedAdminUser(context);
        }

        private static void SeedSportEvents(TradeXContext context)
        {
            var jsonString = File.ReadAllText("sport-events.json");

            var seedData = JsonConvert.DeserializeObject<SportEventsModel[]>(jsonString);

            foreach (var e in seedData)
            {
                if (context.ChangeTracker.Entries<Sport>().Any(s => s.Entity.Name == e.SportName))
                {
                    continue;
                }

                context.Sports.Add(new Sport()
                {
                    Name = e.SportName
                });
            }

            context.SaveChanges();

            foreach (var e in seedData)
            {
                if (context.ChangeTracker.Entries<League>().Any(s => s.Entity.Name == e.LeagueName))
                {
                    continue;
                }

                var linkedSport = context.Sports.FirstOrDefault(s => s.Name == e.SportName);

                context.League.Add(new League()
                {
                    Name = e.LeagueName,
                    Sport = linkedSport
                });
            }

            context.SaveChanges();

            foreach (var e in seedData)
            {
                var linkedLeague = context.League.FirstOrDefault(s => s.Name == e.LeagueName);

                context.Events.Add(new Event()
                {
                    Name = e.EventName,
                    Date = e.EventDate,
                    HomeTeamScore = e.HomeTeamScore,
                    AwayTeamScore = e.AwayTeamScore,
                    HomeTeamOdds = e.HomeTeamOdds,
                    AwayTeamOdds = e.AwayTeamOdds,
                    DrawOdds = e.DrawOdds,
                    League = linkedLeague
                });
            }

            context.SaveChanges();
        }

        [JsonConverter(typeof(JsonPathConverter))]
        public class SportEventsModel
        {
            [JsonProperty("eventName")]
            public string EventName { get; set; }

            [JsonProperty("eventDate")]
            public DateTimeOffset EventDate { get; set; }

            [JsonProperty("league.name")]
            public string LeagueName { get; set; }

            [JsonProperty("sport.name")]
            public string SportName { get; set; }

            [JsonProperty("homeTeamScore")]
            public int HomeTeamScore { get; set; }

            [JsonProperty("awayTeamScore")]
            public int AwayTeamScore { get; set; }

            [JsonProperty("homeTeamOdds")]
            public decimal HomeTeamOdds { get; set; }

            [JsonProperty("awayTeamOdds")]
            public decimal AwayTeamOdds { get; set; }

            [JsonProperty("drawOdds")]
            public decimal DrawOdds { get; set; }
        }

        public class JsonPathConverter : JsonConverter
        {
            public override object ReadJson(JsonReader reader, Type objectType,
                                            object existingValue, JsonSerializer serializer)
            {
                JObject jo = JObject.Load(reader);
                object targetObj = Activator.CreateInstance(objectType);

                foreach (PropertyInfo prop in objectType.GetProperties()
                                                        .Where(p => p.CanRead && p.CanWrite))
                {
                    JsonPropertyAttribute att = prop.GetCustomAttributes(true)
                                                    .OfType<JsonPropertyAttribute>()
                                                    .FirstOrDefault();

                    string jsonPath = (att != null ? att.PropertyName : prop.Name);
                    JToken token = jo.SelectToken(jsonPath);

                    if (token != null && token.Type != JTokenType.Null)
                    {
                        object value = token.ToObject(prop.PropertyType, serializer);
                        prop.SetValue(targetObj, value, null);
                    }
                }

                return targetObj;
            }

            public override bool CanConvert(Type objectType)
            {
                // CanConvert is not called when [JsonConverter] attribute is used
                return false;
            }

            public override bool CanWrite
            {
                get { return false; }
            }

            public override void WriteJson(JsonWriter writer, object value,
                                           JsonSerializer serializer)
            {
                throw new NotImplementedException();
            }
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
