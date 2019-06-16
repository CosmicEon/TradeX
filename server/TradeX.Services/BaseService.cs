using System;
using System.Linq;
using System.Reflection;
using TradeX.DataAccess;

namespace TradeX.Services
{
    public abstract class BaseService
    {
        protected readonly TradeXContext _db;

        public BaseService(TradeXContext db)
        {
            this._db = db;
        }

        protected string[] GetFilledProperties<T>(T obj)
        {
            bool IsOfNullableType(Type type)
            {
                return Nullable.GetUnderlyingType(type) != null;
            }

            bool PropertyHasValue(PropertyInfo prop)
            {
                var value = prop.GetValue(obj);
                var type = prop.PropertyType;

                if (IsOfNullableType(type) && value != null)
                    return true;

                if (type == typeof(string) && !string.IsNullOrEmpty((string)value))
                    return true;

                if (type.IsPrimitive || type.IsEnum)
                {
                    var defaultValue = Activator.CreateInstance(type);

                    if (!object.Equals(value, defaultValue))
                        return true;
                }

                return false;
            }

            return obj.GetType()
               .GetProperties()
               .Where(PropertyHasValue)
               .Select(p => p.Name)
               .ToArray();
        }

        protected IQueryable<T> CreatePaginatedResult<T>(IQueryable<T> query, int pageIndex, int pageSize)
        {
            return query
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize);
        }
    }
}
