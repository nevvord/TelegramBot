import sys
import requests
import json
from bs4 import BeautifulSoup


response = requests.get(sys.argv[1], headers={'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)'})
soup = BeautifulSoup(response.text, 'lxml')
offers = soup.select('#offers_table td.offer')

data = [
    {"link": offer.select_one('#offers_table a.linkWithHash').get('href').split('.html')[0] + '.html',
     "title": offer.select_one('#offers_table h3 a.linkWithHash strong').get_text(),
     "image": None if not offer.select_one('img.fleft') else offer.select_one('img.fleft').get('src'),
     "price": offer.select_one('p.price strong').get_text(),
     "city": offer.select_one('td.bottom-cell div p small span').get_text()
     } for offer in offers
]
print(json.dumps(data))
